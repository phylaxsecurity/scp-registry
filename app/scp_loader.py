import os
import json
import yaml

SCP_ROOT = "cve"

def load_scp(cve_id):
    path = os.path.join(SCP_ROOT, cve_id)
    if not os.path.isdir(path):
        return None
    files = {}
    for root, _, filenames in os.walk(path):
        for filename in filenames:
            full_path = os.path.join(root, filename)
            rel_path = os.path.relpath(full_path, path)
            if filename.endswith(".json") or filename.endswith(".yaml") or filename.endswith(".yml"):
                with open(full_path, 'r', encoding='utf-8') as f:
                    try:
                        if filename.endswith(".json"):
                            files[rel_path] = json.load(f)
                        else:
                            files[rel_path] = yaml.safe_load(f)
                    except Exception as e:
                        print(f"Error loading {rel_path}: {e}")
                        print(f"[DEBUG] Files loaded for {cve_id}: {list(files.keys())}")

    return files
