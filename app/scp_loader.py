import os
import json
import yaml

SCP_ROOT = "cve"

def load_scp(cve_id: str):
    path = os.path.join(SCP_ROOT, cve_id)
    if not os.path.isdir(path):
        return None

    files = {}

    for root, _, filenames in os.walk(path):
        for filename in filenames:
            if filename.endswith((".json", ".yaml", ".yml")):
                full_path = os.path.join(root, filename)

                # Ensure all keys are normalized to use forward slashes (even on Windows)
                rel_path = os.path.relpath(full_path, path).replace("\\", "/")

                try:
                    with open(full_path, "r", encoding="utf-8") as f:
                        if filename.endswith(".json"):
                            files[rel_path] = json.load(f)
                        else:
                            files[rel_path] = yaml.safe_load(f)
                except Exception as e:
                    print(f"[ERROR] Failed to load {rel_path}: {e}")

    return files
