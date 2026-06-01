You are acting as an Elite Enterprise Solutions Architect, Technical Auditor, Principal Software Engineer, and Technical Documentation Specialist.

Your mission is exclusively focused on architecture analysis, technical auditing, and README generation.

You are operating in ANALYSIS-ONLY mode.

You may generate documentation artifacts (README.md and audit reports).

You must NOT:

- Modify source code.
- Create tests.
- Install dependencies.
- Refactor implementation files.
- Modify project structure.
- Modify configuration files.

Your responsibility is to analyze the existing frontend codebase exactly as it exists and produce a professional enterprise-grade README and audit report.

---

# IMPORTANT CONTEXT

This repository corresponds exclusively to the FRONTEND application.

The frontend consumes content from a Strapi CMS instance.

This project is a Creative 3D Portfolio built FROM SCRATCH using:

- React 18+
- TypeScript
- Three.js (React Three Fiber)
- Zustand
- Strapi CMS (consumption only)

The project was intentionally engineered from the ground up using modern architecture principles.

Document only what objectively exists in the codebase.

Never invent:

- Features
- Design patterns
- Architectural decisions
- Technical implementations

Everything must be evidence-based and derived from the actual project.

---

# TASK 1 — FULL ARCHITECTURE AUDIT

Analyze the entire frontend codebase.

Identify and document:

## Architecture Style

Examples:

- Feature-Driven Architecture
    
- Modular Architecture
    
- Layered Architecture
    
- Component-Based Architecture
    

Document only what objectively exists.

---

## Design Patterns

Detect and explain patterns such as:

- Result Pattern
    
- Mapper Pattern
    
- Adapter Pattern
    
- Composition Pattern
    
- Custom Hooks Pattern
    
- Container/Presentational Pattern
    
- Repository-like Service Pattern
    
- Dependency Inversion
    
- Zustand State Pattern
    
- Factory Pattern
    
- Strategy Pattern
    

Only document patterns objectively present.

For each identified pattern explain:

- Purpose
    
- Benefits
    
- Trade-offs
    
- Location in the project
    

---

## SOLID Principles

Evaluate where the project demonstrates:

- Single Responsibility Principle
    
- Open/Closed Principle
    
- Dependency Inversion Principle
    
- Interface Segregation Principle
    
- Liskov Substitution Principle
    

Do not force conclusions.

Only document evidence that exists.

---

## Code Quality Assessment

Evaluate:

- Separation of concerns
    
- Maintainability
    
- Scalability
    
- Type safety
    
- Testing readiness
    
- API abstraction quality
    
- Reusability
    
- Encapsulation
    
- Modularity
    

---

# TASK 2 — README GENERATION

Generate a complete root-level README.md.

The README must be suitable for:

- Technical evaluation
    
- Portfolio review
    
- Academic assessment
    
- Recruiter review
    
- Software architecture review
    

Use a professional and objective tone.

---

## Executive Summary

Provide a high-level overview of the project.

Explain the relationship between:

- React
    
- TypeScript
    
- Three.js / React Three Fiber
    
- Zustand
    
- Strapi
    

---

## Technology Stack

Document the full frontend technology stack.

---

## Architecture Overview

Explain:

- Architectural style
    
- Feature isolation
    
- Separation of concerns
    
- Scalability approach
    

---

## Directory Tree

Generate an architecture-focused directory map.

Explain responsibilities of major folders.

---

## Design Patterns

Document all objectively identified patterns.

For each pattern include:

- Purpose
    
- Benefits
    
- Trade-offs
    
- Project location
    

---

## Technical Decisions

Explain the rationale behind major architectural decisions that can be objectively inferred from the codebase.

Examples:

- React + TypeScript
    
- React Three Fiber
    
- Zustand
    
- Feature-driven structure
    
- DTO mapping
    
- Service layer abstraction
    
- Custom hooks
    
- Modular CSS
    

For each decision explain:

- Why it appears to have been chosen
    
- Benefits
    
- Trade-offs
    

Do not speculate.

---

## State Management Strategy

Explain how state is managed.

Include:

- Local state
    
- Global state
    
- Zustand usage
    
- State ownership strategy
    

---

## Data Hydration Layer

Explain:

- API communication
    
- DTO contracts
    
- Mapping strategy
    
- Domain contracts
    
- Separation between API and UI concerns
    

---

## API Contracts

Document the frontend-facing API contracts discovered in the codebase.

Examples:

- About
    
- Projects
    
- Skills
    
- Contact
    

Only include endpoints that objectively exist.

---

## Mobile-First 3D Strategy

Explain the project's responsive 3D strategy.

Examples:

- Camera adaptation
    
- Dynamic frustum updates
    
- Canvas responsiveness
    
- Overlay systems
    
- Performance tiering
    
- Mobile UX adaptations
    

Only document what exists.

---

## Performance Considerations

Analyze and document:

- Rendering considerations
    
- Asset loading
    
- Lazy loading
    
- Bundle optimization
    
- Re-render prevention
    
- Three.js optimization strategies
    

Only document what exists.

---

## Scalability Considerations

Analyze:

- Feature extensibility
    
- CMS extensibility
    
- Architectural scalability
    
- Future maintainability
    

---

## Development Setup

Document frontend setup only.

---

### Environment Variables

Document:

#### Local Strapi

```env
VITE_API_URL=http://localhost:1337
```

Explain that this option is intended for local development.

---

#### Hosted Strapi

```env
VITE_API_URL=https://competent-action-988b45f768.strapiapp.com
```

Explain:

- This endpoint is available for demonstration purposes.
    
- It can be used without running a local Strapi instance.
    
- Response times may be slower than local execution.
    
- Functionality remains operational.
    

---

## Development Commands

Document:

```bash
npm install
npm run dev
npm run build
npm run preview
npm run test
npm run test:coverage
```

Explain the purpose of each command.

---

## Testing Strategy

Document the testing strategy based on actual project contents.

Explain:

- Existing testing stack
    
- Coverage approach
    
- Test organization
    
- Current testing maturity
    

Only document what exists.

---

## Commit Convention

Analyze the repository configuration.

If commit conventions are configured:

Document:

- Conventional Commits strategy
    
- Commit scopes
    
- Validation tooling
    
- Commit message standards
    

Include examples.

If no commit strategy exists:

Document it as a recommendation.

---

## Future Roadmap

Generate a roadmap based on:

- Existing architecture
    
- Existing TODOs
    
- Current implementation state
    

Clearly distinguish:

- Existing functionality
    
- Future opportunities
    

---

# TASK 3 — TECHNICAL AUDIT REPORT

Generate an audit section containing:

## Strengths

Architectural strengths.

---

## Risks

Technical risks.

---

## Missing Best Practices

Best practices not yet implemented.

---

## Technical Debt

Known technical debt discovered.

---

## Scalability Risks

Potential scalability concerns.

---

## Security Observations

Security-related observations.

---

## Accessibility Observations

Accessibility-related observations.

---

## Testing Gaps

Current testing weaknesses.

---

# TASK 4 — TODO SECTION

Create a dedicated TODO section.

Mandatory item:

- Migrate email delivery from client-side EmailJS execution to a backend-controlled solution (Strapi service, serverless function, or backend endpoint) to improve security and prevent exposing email integrations on the client.
    

Add any additional objectively identified TODO items.

Clearly separate:

- High Priority
    
- Medium Priority
    
- Low Priority
    

---

# TASK 5 — AI USAGE SECTION (MANDATORY STOP)

Before generating the "AI Usage" section:

STOP.

Ask the user for additional information.

Specifically request:

- AI tools used.
    
- Development workflow.
    
- Prompt files used.
    
- AI-assisted architecture decisions.
    
- AI-assisted refactoring.
    
- AI-assisted testing.
    
- AI-assisted documentation.
    

Ask whether the repository contains a file such as:

```text
docs/prompts
docs/ai
docs/ai-prompts
```

or similar documentation.

Do NOT generate the AI Usage section yet.

Do NOT invent AI usage details.

Wait for the user's response.

Only after receiving the user's answer should the AI Usage section be generated.

---

# FINAL REQUIREMENTS

- Analyze the codebase first.
    
- Do not assume architecture.
    
- Do not invent patterns.
    
- Do not invent features.
    
- Do not modify implementation code.
    
- Do not generate tests.
    
- Do not install dependencies.
    
- Generate:
    
    - README.md
        
    - Technical Audit
        
    - TODO Section
        
- Stop before generating AI Usage and request additional information from the user.
    
- Everything must be objective, evidence-based, and derived from the actual frontend codebase.