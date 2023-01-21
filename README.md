# OCI Task Management UI Application

Helps to view and manage OCI Tasks. Interacts with OCI Task REST Service for loading and persisting OCI Tasks.

## Requirements

1. Node.js 17
4. Provide OCI Task REST Service URL [here](https://github.com/rajeshkurup/ocitasknodeweb/blob/main/src/OciTaskData.js#L3).

## Prerequisites

1. Log on to [OCI Cloud](https://cloud.oracle.com).
2. Create a Compartment `ocitask-compartment` for OCI Task System.
3. Create Container Registry for `ocitaskserv` (select `ocitask-compartment` Compartment).
4. Create VCN and Subnet (select `ocitask-compartment` Compartment).
5. Add following Ingress Rules in default Security List of the VCN Subnet.
6. Rule for `ocitaskserv`: Allow TCP Traffic for IP range `0.0.0.0/0` for destination port `8081` (all Source Ports).
7. Rule for `SonarQube`: Allow TCP Traffic for IP range `0.0.0.0/0` for destination port `9000` (all Source Ports).
8. Rule for `MySQL`: Allow TCP Traffic for IP range `0.0.0.0/0` for destination port `3306` (all Source Ports).
9. Rule for `ocitasknodeweb`: Allow TCP Traffic for IP range `0.0.0.0/0` for destination port `3000` (all Source Ports).

## Build

- In the project directory, run: `npm run build`.
- Builds the app for production to the `build` folder.
- It correctly bundles React in production mode and optimizes the build for the best performance.

## Test

- In the project directory, run: `npm test`.
- Launches the test runner in the interactive watch mode.

## Launch

- In the project directory, run: `npm start`.
- Runs the app in the development mode.
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
- The page will reload when you make changes.
- Lint errors (if any) would be logged into console.

## Build Project Using OCI

1. Logon to [OCI Cloud](https://cloud.oracle.com).
2. Launch OCI Visual Builder and Configure OCI Account.
3. Create Build Executor Template for Oracle Linux 8 (Select Required Software, Java-17, Node.js-17 and Docker-20).
4. Create Build Executor using above Template.
5. Create Build Project and select above Build Executor Template.
6. Configure Docker Registry.
7. Configure Git Repository.
8. Create Build Job.
9. Add Steps to build Node.js project (commands mentioned above).
10. Add Steps like Docker Login, Docker Build Image and Docker Push Image. Use Docker Image name like `sjc.ocir.io/<Namespace of the OCI Container Registry>/ocitasknodeweb:latest`).

## Deploy Project Using OCI

1. Logon to [OCI Cloud](https://cloud.oracle.com).
2. Use Compartment, VCN and Subnet created in Prerequisites section above.
3. Deploy `sjc.ocir.io/<Namespace of the OCI Container Registry>/ocitasknodeweb:latest` Docker Image into [Oracle Managed Kubernetes Cluster](https://docs.oracle.com/en/solutions/monitor-applications-on-kubernetes/deploy-application-oracle-managed-kubernetes-cluster.html#GUID-B2D9C6EC-DCDF-4BB7-B9C1-3493DA03A3FF).
4. Copy and Save Public IP of the Kubernetes Cluster.

## Build Project Manually

### Build

In the project directory, run: `npm run build`.

### Testing

In the project directory, run: `npm test`.

### Build Docker Image

Run `docker build . -t sjc.ocir.io/<Namespace of the OCI Container Registry>/ocitasknodeweb:latest` from root folder.

### Publish Docker Image

#### Login to DockerHub

Run `docker login sjc.ocir.io` from root folder. Provide DockerHub User Id and Password (API Token from `Identity->Domains->Default domain->Users-><UserId>->API keys`).

#### Publish Image into DockerHub

Run `docker push sjc.ocir.io/<Namespace of the OCI Container Registry>/ocitasknodeweb:latest` from root folder.

## Deploy Project Manually

### Create a VM Instance for OCI Task Service UI

1. Select `ocitask-compartment` Compartment.
2. Use Oracle Linux 8. 
3. Select Single Processor with 16GB Memory. 
4. Save Public and Private Key files to enable SSH into the VM Instance.
5. Select VCN and Subnet from `ocitask-compartment` Compartment.
6. Create VM Instance `ocitasknodeweb-host-1`.
7. Copy and Save Public IP.
8. SSH into new VM Instance `ssh -i <private key file> opc@<Public IP>`.
9. [Deploy Docker into the VM Instance](https://oracle-base.com/articles/linux/docker-install-docker-on-oracle-linux-ol8).

### Load Docker Image for Deployment

Run `docker pull sjc.ocir.io/<Namespace of the OCI Container Registry>/ocitasknodeweb:latest` on Host where Docker Image is going to run.

### Run Docker Container on a Host

Run `docker run -d -p 3000:3000 --restart always --name ocitasknodeweb_latest sjc.ocir.io/<Namespace of the OCI Container Registry>/ocitasknodeweb:latest` on Host where Docker Image is loaded.

### Verify Docker Container

Run `docker ps --all` on Host where Docker Image is deployed.

### Stop Docker Container

Run `docker stop ocitasknodeweb_latest` on Host where Docker Image is deployed.

### Remove Loaded Docker Image from Host

Run `docker rm ocitasknodeweb_latest` on Host where Docker Image is loaded.
