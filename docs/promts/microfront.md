You are acting as a Senior Frontend Architect and DevOps Consultant.

Create a Markdown document inside the `docs/` folder that answers Exercise 3: Architecture Reasoning (AI-assisted).

This is a documentation-only task.

Do not modify source code.

Do not create tests.

Do not install dependencies.

Do not change project configuration.

---

# CONTEXT

The current project is a React + TypeScript + React Three Fiber + Zustand frontend application using a Feature-Driven Architecture and consuming content from Strapi CMS.

The purpose of this exercise is not to redesign the current application, but to explain how it could evolve into a scalable architecture if multiple teams, independent deployments, and future growth requirements appeared.

The proposal must be grounded in the current project and not based on a generic unrelated system.

---

# DOCUMENT STRUCTURE

Generate a concise and professional architecture document with the following sections.

---

## 1. Introduction

Briefly explain:

* current architecture
* current strengths
* why a microfrontend approach could be considered in the future

Keep this section short.

---

## 2. Chosen Microfrontend Strategy

Select and justify a single microfrontend strategy.

Explain:

* why it was chosen
* advantages
* disadvantages
* why it fits this project

Compare briefly against alternatives if relevant.

The explanation should be practical, not academic.

Include a simple architecture diagram using Mermaid or ASCII.

Example concepts:

* Shell application
* About microfrontend
* Projects microfrontend
* Skills microfrontend
* Contact microfrontend
* Shared design system

---

## 3. CI/CD Pipeline Design

Design a high-level CI/CD pipeline for the proposed architecture.

Explain stages such as:

* Pull Request Validation
* Lint
* Type Checking
* Unit Tests
* Build
* Staging Deployment
* Production Deployment

Explain how the shell and microfrontends could be deployed independently.

Include a simple diagram.

Keep the explanation practical and concise.

---

## 4. Scalability, Maintainability, and Performance Considerations

Split into three subsections.

### Scalability

Explain:

* independent teams
* independent deployments
* feature ownership
* future growth

### Maintainability

Explain:

* separation of concerns
* isolated codebases
* easier testing
* reduced coupling

### Performance

Explain:

* lazy loading
* code splitting
* shared dependencies
* bundle optimization
* considerations for React Three Fiber applications

Include trade-offs where appropriate.

---

## 5. Conclusion

Provide a short final justification explaining:

* why the chosen microfrontend strategy is appropriate
* why the proposed CI/CD flow supports growth
* why the architecture would remain maintainable and performant

Keep the conclusion concise.

---

# QUALITY REQUIREMENTS

Target length:

Approximately 3–5 pages.

Be concise.

Avoid generic theory.

Relate decisions back to the current project whenever possible.

Focus on reasoning rather than implementation.
