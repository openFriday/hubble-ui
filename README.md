<p align="center">
  <h1 align="center">Hubble UI</h1>
  <p align="center">
    <p align="center"><b>Hubble UI</b> is an open-source user interface for <a href="https://github.com/cilium/hubble">Cilium Hubble</a>.
    </p>
  </p>
</p>

## Installation

**Hubble UI** is installed as part of **Hubble**. Please see the [Hubble | Getting Started Guide](https://docs.cilium.io/en/latest/gettingstarted/hubble/) for details.

## Motivation

Troubleshooting connectivity in microservices-based applications is a challenging task. Simply viewing a list of all pods (`kubectl get pods`) does not indicate dependencies between each service, external APIs, or databases.

Hubble UI enables effortless, automatic discovery of the service dependency graph for Kubernetes Clusters at L3/L4 and even L7, allowing user-friendly visualization and filtering of dataflows as a Service Map.

See the [Hubble Introduction](https://docs.cilium.io/en/latest/gettingstarted/hubble_intro/) for more information.

![Service Map](https://user-images.githubusercontent.com/46656072/210303251-dfd5c3f5-0568-4287-adec-d664494e39ed.png)

## Development

### Prerequisites

- [npm](https://www.npmjs.com/)
- [Node.js](https://nodejs.org/en/) ≥ v18.0

### Backend

To develop and make changes to the Go backend:

1. Go to the `backend` directory and execute the `ctl.sh` script:

   ```sh
   cd ./backend
   ./ctl.sh run
   ```

$~~~~~~~$ Wait until the build is complete and the server is running.

2. In another terminal, create a port-forward to `hubble-relay`:

   ```sh
   kubectl port-forward -n kube-system deployment/hubble-relay 50051:4245
   ```

**Docker 🗳**

If you prefer to develop with Docker, build the backend Docker image to run the backend:

```sh
make hubble-ui-backend
```

### Frontend

1. Install dependencies:

   ```sh
   npm install
   ```

2. Start the development server:

   ```sh
   npm run watch
   ```

3. Open **[http://localhost:8080](http://localhost:8080/)**.

**Docker 🗳**

If you prefer to develop with Docker, build the frontend Docker image:

```sh
make hubble-ui
```

## Community

Learn more about the [Cilium Community](https://github.com/cilium/cilium#community).

## Perform a release

Push a tag into GitHub and ping a project maintainer to accept the [GitHub action run](https://github.com/cilium/hubble-ui/actions), which will push the images built into the official repositories.

## License

Hubble UI is licensed under [Apache License Version 2.0](https://github.com/cilium/hubble-ui/blob/master/LICENSE).
