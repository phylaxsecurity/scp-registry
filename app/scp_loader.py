import os
import json
import yaml

SCP_ROOT = "cve/cve"

def load_scp(cve_id):
    path = os.path.join(SCP_ROOT, cve_id)
    if not os.path.isdir(path):
        return None
    files = {}
    for filename in os.listdir(path):
        if filename.endswith(".json") or filename.endswith(".yaml") or filename.endswith(".yml"):
            with open(os.path.join(path, filename), 'r') as f:
                if filename.endswith(".json"):
                    files[filename] = json.load(f)
                else:
                    files[filename] = yaml.safe_load(f)
    return files
