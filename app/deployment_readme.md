# 🛡️ Phylax SCP Runtime Server

This is the production-ready server to serve Security Context Protocols (SCPs) from (https://github.com/phylaxsecurity/scp-registry).

---

## 🔧 Features

- ✅ Pulls CVE-SCP packages directly from repo
- ✅ RESTful API with `/context`, `/yaml`, `/detect` endpoints
- ✅ Containerized for Docker & K8s deployment
- ✅ Pluggable into AI agents, DevSecOps tools, CI pipelines

---

## 📦 Usage

### 🚀 Run Locally

If running/developing from an IDE like Pycharm and localhost from your browser, ensure your working directory is configured properly and run main.py as the primary master file.

This occured with my IDE where the working directory changed automatically to the app subfolder of the repo, causing fastapi issues.

```bash
git clone https://github.com/phylaxsecurity/scp-registry.git
cd scp-runtime
docker build -t phylax-scp-runtime .
docker run -p 8000:8000 phylax-scp-runtime
```

The server will auto-clone the SCP registry on startup if not present.

### 📡 API Endpoints

- `GET /scp/CVE-2022-22965/context`
- `GET /scp/CVE-2022-22965/yaml`
- `GET /scp/CVE-2022-22965/detect`

---

## ⚙️ Kubernetes (Optional)

Create a Deployment + Service:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: scp-runtime
spec:
  replicas: 1
  selector:
    matchLabels:
      app: scp-runtime
  template:
    metadata:
      labels:
        app: scp-runtime
    spec:
      containers:
      - name: scp-runtime
        image: your-dockerhub-user/phylax-scp-runtime
        ports:
        - containerPort: 8000
---
apiVersion: v1
kind: Service
metadata:
  name: scp-runtime
spec:
  selector:
    app: scp-runtime
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8000
  type: LoadBalancer
```

---

## 🧠 Maintained by [Phylax Security](https://phylaxsecurity.dev)
