The complete source code, technical documentation, setup instructions, and supporting materials are available in the repositories listed below.

Each repository contains its own comprehensive `README.md`, including:

- Installation and setup instructions
- Architecture decisions and technical rationale
- AI Usage documentation
- Development workflow and conventions
- Environment configuration
- Additional implementation details required for evaluation

---

## Repository Links

### Frontend Repository

**Repository URL**

[Creative personal 3D portfolio](https://github.com/Nicolas29Diaz2/portfolio-3d)

**Project:** Creative Personal 3D Portfolio

#### Optional Backend Configuration

If you prefer not to run the backend locally, the frontend can consume the hosted Strapi environment using the following variables:

```env
VITE_STRAPI_BASE_URL="https://competent-action-988b45f768.strapiapp.com"
VITE_STRAPI_TOKEN="e28dcc0ebf80ae637d5cd319a038e29f26e603af51b5a1c130fff43a0e7c226b26ba57b40b3f55267ca1f949faf5bb88af1eed3e19b10625ff784591fed0b39448fd3611b1ada3d7bcf10e2d02b035234000f0dffcf210270871a7c247ee65d5495d3f7af2bc77e1d659aa9b2058a46e0680f44e29f77e5646124ecc91ca071d"
```

#### Notes

- The recommended approach is to run the backend locally and import the provided data following the backend repository documentation.
- If using a local Strapi instance, create a **Read-Only API Token** and update the frontend environment variables accordingly.
- Full setup instructions are available in the frontend README.

---

### Backend Repository

**Repository URL**

[Strapi Portfolio](https://github.com/Nicolas29Diaz2/portfolio-strapi)

**Project:** Strapi CMS Backend

---

## Local Execution

To fully evaluate the solution:

1. Clone both repositories.
2. Follow the setup instructions in each README.
3. Start the Strapi backend.
4. Start the React frontend.
5. Verify frontend-backend integration through the documented environment configuration.

All required documentation and configuration details are included within the respective repositories.