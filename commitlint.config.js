const configuration = {
  extends: ["@commitlint/config-conventional"],

  rules: {
    "scope-empty": [2, "never"],
    "scope-case": [2, "always", "kebab-case"],
    "scope-min-length": [2, "always", 2],
    "scope-max-length": [2, "always", 30],

    "subject-min-length": [2, "always", 10],
    "subject-max-length": [2, "always", 72],
    "subject-full-stop": [2, "never", "."],

    "header-min-length": [2, "always", 20],
    "header-max-length": [2, "always", 100],
  },

  prompt: {
    messages: {
      skip: "(presiona enter para omitir)",
      max: "máximo %d caracteres",
      min: "mínimo %d caracteres",
      emptyWarning: "no puede estar vacío",
      upperLimitWarning: "sobre el límite",
      lowerLimitWarning: "por debajo del límite",
    },
    questions: {
      type: {
        description: "Selecciona el tipo de cambio que estás commiteando:",
        enum: {
          feat: {
            description: "✨ Una nueva característica o funcionalidad",
            title: "Features",
            emoji: "✨",
          },
          fix: {
            description: "🐛 Solución de un error (bug fix)",
            title: "Bug Fixes",
            emoji: "🐛",
          },
          docs: {
            description: "📚 Cambios solo en la documentación",
            title: "Documentation",
            emoji: "📚",
          },
          style: {
            description:
              "💎 Formato y estilos (espacios, puntos y comas, etc; sin cambios de lógica)",
            title: "Styles",
            emoji: "💎",
          },
          refactor: {
            description:
              "📦 Cambios en el código que ni arreglan un bug ni añaden una función",
            title: "Code Refactoring",
            emoji: "📦",
          },
          perf: {
            description: "🚀 Un cambio de código que mejora el rendimiento",
            title: "Performance Improvements",
            emoji: "🚀",
          },
          test: {
            description:
              "🚨 Añadir pruebas faltantes o corregir pruebas existentes",
            title: "Tests",
            emoji: "🚨",
          },
          build: {
            description:
              "🛠️ Cambios que afectan el sistema de compilación o dependencias externas",
            title: "Builds",
            emoji: "🛠️",
          },
          ci: {
            description:
              "⚙️ Cambios en archivos y scripts de configuración de CI/CD",
            title: "Continuous Integrations",
            emoji: "⚙️",
          },
          chore: {
            description:
              "♻️ Otras tareas de mantenimiento que no modifican src ni archivos de prueba",
            title: "Chores",
            emoji: "♻️",
          },
          revert: {
            description: "🗑️ Revierte un commit anterior",
            title: "Reverts",
            emoji: "🗑️",
          },
        },
      },
      scope: {
        description:
          "Cuál es el alcance (scope) de este cambio? (OBLIGATORIO - ej: auth, api, ui)",
      },
      subject: {
        description:
          "Escribe una descripción corta del cambio en modo imperativo",
      },
      body: {
        description:
          "Proporciona una descripción más larga y detallada del cambio (opcional)",
      },
      isBreaking: {
        description:
          "¿Hay algún cambio importante que rompa la compatibilidad (Breaking Change)?",
      },
      breakingBody: {
        description:
          "Un commit de tipo BREAKING CHANGE requiere una descripción larga. Por favor ingrésala",
      },
      breaking: {
        description: "Describe los cambios disruptivos (Breaking Changes)",
      },
      isIssueAffected: {
        description:
          "¿Este cambio afecta a algún issue abierto en GitHub/Jira?",
      },
      issuesBody: {
        description:
          "Si se cierran issues, el commit requiere una descripción larga.",
      },
      issues: {
        description:
          'Añade la referencia del issue (ej: "fix #123", "re #123")',
      },
    },
  },

  utils: {
    getErrorMessage: (rule) => {
      const errorMessages = {
        "scope-empty": `\n❌ ERROR: El Scope (alcance) es requerido.\n💡 Ejemplo: "feat(auth): agregar login"\n`,
        "scope-case": `\n❌ ERROR: El scope debe estar en kebab-case (ej: user-profile).\n`,
        "subject-min-length": `\n❌ ERROR: El mensaje del commit es muy corto (mínimo 10 caracteres).\n`,
        "subject-max-length": `\n❌ ERROR: El mensaje del commit es muy largo (máximo 72 caracteres).\n`,
        "header-min-length": `\n❌ ERROR: El commit completo es demasiado corto (mínimo 20 caracteres).\n`,
      };
      return (
        errorMessages[rule] ||
        `❌ ERROR en la regla: ${rule}\n📖 Revisa las reglas en: https://commitlint.js.org/`
      );
    },
  },
};

export default configuration;
