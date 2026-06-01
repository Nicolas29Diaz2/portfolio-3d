# 1. Primero lenguaje natural a IAs como Copilot, Gemini o ChatGPT

Como contexto previo tienen que son Promt Engieenrs, esta es la peticion en lenguaje natural:

"Ya tengo mi README, entonces podemos ahora fixear algunas cosas, entonces dame un promt para que del README solucione: Inconsistent mapping layer | Skills mapping in hook vs. services for other features Centralized env type declarations |VITE_STRAPI_TOKEN and STRAPI_API_BASE_URL used but not in vite-env.d.ts gitignore coverage output | No coverage/ entry Skills mapping in hook, not service | useSkills.ts Env var inconsistency | strapiMedia.ts vs .env.example, STRAPI_API_BASE_URL undocumented; media URLs may not match API base PortfolioPage internal name | PortfolioPage.tsx exports App as default, Naming inconsistency Partial ARIA coverage | Toast (role="alert"), some buttons (aria-label), semantic HTML on products page Generic alt text | About image uses alt="IconAbout" 

Cuando solucione cada cosa, que actualice el README, simplemente quitando esos issues y ya, sin decir nada mas, solo que los quite, por otro lado que tambien actualice el README en la parte de Development Commands porque eagregué dos comandos."

# 2. Promt refactorizado

La IA con rol de promt engiener refactoriza la peticion para el agente:

"You are acting as a Senior Frontend Engineer and Technical Auditor.

Your task is to resolve ONLY the issues listed below.

Do not perform additional refactors.

Do not introduce architectural changes outside the scope of the issues.

Do not modify unrelated files.

---

## Issues To Resolve

### 1. Inconsistent Mapping Layer

Current issue:

- Skills mapping is performed inside `useSkills.ts`.
- Other features perform mapping inside the service layer.

Objective:

- Make the Skills feature consistent with the rest of the architecture.
- Move mapping responsibilities to the appropriate service layer if necessary.
- Keep hooks focused on state lifecycle and orchestration.

---

### 2. Centralized Environment Type Declarations

Current issue:

Environment variables are used but not fully declared in:

```txt
vite-env.d.ts
```

Verify and add any missing declarations, including:

- VITE_STRAPI_TOKEN
- STRAPI_API_BASE_URL

Ensure all environment variables used by the project are typed consistently.

---

### 3. Coverage Output Ignored

Current issue:

```txt
coverage/
```

is not ignored.

Objective:

Add the appropriate entry to `.gitignore`.

---

### 4. Environment Variable Consistency

Current issue:

Potential mismatch between:

- strapiMedia.ts
- .env.example
- vite-env.d.ts
- README.md

Objective:

Ensure:

- Variable names are consistent.
- Documentation matches implementation.
- Media URL generation follows the same source of truth as API configuration.

---

### 5. PortfolioPage Naming Consistency

Current issue:

```txt
PortfolioPage.tsx
```

exports:

```ts
export default App;
```

Objective:

Align exported component naming with file naming conventions used throughout the project.

Avoid generic names when a feature-specific name exists.

---

### 6. Accessibility Improvements

Current issue:

Accessibility coverage is only partial.

Review and improve:

- Buttons
- Interactive controls
- Navigation elements
- Icon-only elements
- Semantic HTML usage

Add ARIA attributes only when necessary.

Prefer semantic HTML over ARIA workarounds.

---

### 7. Generic Alt Text

Current issue:

Example:

```html
alt="IconAbout"
```

Objective:

Replace generic alt text with meaningful, contextual descriptions.

If an image is decorative:

- Use an empty alt attribute.

If informative:

- Provide an accessible description.

---

## README UPDATE

After fixing each issue:

Update the README accordingly.

Requirements:

- Remove resolved issues from audit findings.
- Remove resolved items from technical debt sections.
- Remove resolved items from TODO sections if no longer applicable.
- Update architecture descriptions if affected.
- Update environment variable documentation if affected.
- Update accessibility documentation if affected.
- Update development command documentation.

Do not add explanations saying that issues were fixed.

Simply make the README reflect the current state of the project after the fixes.

---

## Validation

Before finishing:

1. Verify TypeScript compilation passes.
2. Verify lint passes if configured.
3. Verify imports remain valid.
4. Verify no unused code was introduced.
5. Verify README is synchronized with implementation.

---

## Final Output

Provide:

- Files modified.
- Summary of fixes performed.
- README sections updated.

Do not perform any additional improvements outside the issues listed above."