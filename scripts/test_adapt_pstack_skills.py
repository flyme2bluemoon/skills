"""Exercise the import helper in an isolated repository: python3 -m unittest discover -s scripts."""

import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest


class AdaptPstackSkillsTest(unittest.TestCase):
    def setUp(self):
        self.sandbox = tempfile.TemporaryDirectory()
        self.addCleanup(self.sandbox.cleanup)
        self.root = Path(self.sandbox.name)
        self.repo = self.root / "repo"
        (self.repo / "scripts").mkdir(parents=True)
        self.script = self.repo / "scripts/adapt-pstack-skills.sh"
        shutil.copyfile(Path(__file__).with_name("adapt-pstack-skills.sh"), self.script)
        self.upstream = self.root / "upstream"
        self.temporary = self.root / "temporary"
        self.temporary.mkdir()
        for name in ("principle-attack-the-premise", "principle-test-behavior-not-implementation", "unslop"):
            source = self.upstream / name / "SKILL.md"
            source.parent.mkdir(parents=True)
            source.write_text(
                f"---\nname: {name}\ndescription: Example\ndisable-model-invocation: true\n---\n"
                "[Related](../principle-build-the-lever/SKILL.md)\n"
            )
        self.local = self.repo / "skills/pstack-principle-attack-the-premise/SKILL.md"
        self.local.parent.mkdir(parents=True)
        self.local.write_text("Local customization\n")
        self.system = self.repo / "SYSTEM_AGENTS.md"
        self.system.write_text("Personal preferences\n## Writing Style Guide\nLocal rules\n")
        self.before = self.snapshot()

    def snapshot(self):
        return {str(p.relative_to(self.repo)): p.read_bytes() for p in self.repo.rglob("*") if p.is_file()}

    def run_import(self, *targets):
        return subprocess.run(
            ["bash", str(self.script), *targets],
            env={**os.environ, "PSTACK_SKILLS_ROOT": str(self.upstream), "TMPDIR": str(self.temporary)},
            capture_output=True, text=True,
        )

    def test_default_import_creates_adapted_review_copies_and_preserves_repository(self):
        result = self.run_import()
        self.assertEqual(result.returncode, 0, result.stderr)
        output, = self.temporary.iterdir()
        self.assertEqual(
            sorted(p.name for p in output.iterdir()),
            ["pstack-principle-attack-the-premise", "pstack-principle-test-behavior-not-implementation", "unslop"],
        )
        content = (output / "pstack-principle-attack-the-premise/SKILL.md").read_text()
        self.assertEqual(content, "---\nname: pstack-principle-attack-the-premise\ndescription: Example\n---\n[Related](../pstack-principle-build-the-lever/SKILL.md)\n")
        self.assertIn(str(output), result.stdout)
        self.assertEqual(self.snapshot(), self.before)

    def test_repeated_imports_have_separate_outputs(self):
        for _ in range(2):
            result = self.run_import("unslop")
            self.assertEqual(result.returncode, 0, result.stderr)
        outputs = list(self.temporary.iterdir())
        self.assertEqual(len(outputs), 2)
        self.assertEqual((outputs[0] / "unslop/SKILL.md").read_bytes(), (outputs[1] / "unslop/SKILL.md").read_bytes())
        self.assertEqual(self.snapshot(), self.before)

    def test_invalid_target_does_not_generate_partial_output(self):
        result = self.run_import("unslop", "invalid")
        self.assertEqual(result.returncode, 2)
        self.assertIn("Unknown pstack skill: invalid", result.stderr)
        self.assertEqual(list(self.temporary.iterdir()), [])
        self.assertEqual(self.snapshot(), self.before)

    def test_missing_source_does_not_generate_partial_output(self):
        (self.upstream / "unslop/SKILL.md").unlink()
        result = self.run_import()
        self.assertEqual(result.returncode, 1)
        self.assertIn("Missing upstream skill:", result.stderr)
        self.assertEqual(list(self.temporary.iterdir()), [])
        self.assertEqual(self.snapshot(), self.before)


if __name__ == "__main__":
    unittest.main()
