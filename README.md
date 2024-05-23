# Cancer Detection Backend Service

This repository contains the backend services for a machine learning model designed for cancer detection. The backend provides two endpoints: `/predict` and `/predict/histories`.

The service is built using **Hapi.js** and is deployed on **Google Cloud Run** (GCP), utilizing Docker for containerization. The prediction histories are stored on **Google Cloud Firestore**, and the machine learning model is stored in **Google Cloud Storage Buckets**. The ML model receives an image input and provides an output indicating whether it is "Cancer" or "Non Cancer".

**Note:** This repository is created as part of the submission for the Dicoding course called "Applied Machine Learning in Google Cloud".
