# 🏛️ BetterTanay.org

A community-led, open-source civic tech portal to make the government of the **Municipality of Tanay, Rizal, Philippines** accessible, transparent, and user-friendly. Built with React, TypeScript, and Tailwind CSS.

---

## Features

- **🌐 Multilingual Support**: English and Filipino
- **📱 Responsive Design**: Mobile-first approach with modern UI/UX
- **♿ Accessibility**: WCAG 2.1 compliant design
- **📝 Content Management**: YAML-based content system for easy updates
- **🎨 Customizable**: Easy theming and branding customization
- **⚡ Fast Performance**: Built with Vite for optimal loading speeds
- **🔍 SEO Optimized**: Built-in SEO with react-helmet, meta tags, and Open Graph support

---

## Project Structure

```
bettertanay/
├── content/                     # Main content source (Markdown, YAML, JSON)
│   ├── services/                # Citizen service guides by category
│   │   ├── agriculture-fisheries/
│   │   ├── business/
│   │   ├── disaster-preparedness/
│   │   ├── education/
│   │   ├── environment/
│   │   ├── garbage-waste-disposal/
│   │   ├── health-services/
│   │   ├── housing-land-use/
│   │   ├── infrastructure-public-works/
│   │   ├── social-welfare/
│   │   └── tourism/
│   └── tourism/                 # Tourism articles and establishment data
│
├── public/                      # Static public assets
│   ├── locales/                 # Translation JSON files
│   │   ├── en/
│   │   └── fil/
│   ├── bettertanay-logo-icon.png
│   ├── templates/               # HTML templates
│   │   └── og-image-template.html
│   └── vite.svg
│
├── src/                         # Main React + TypeScript application
│   ├── assets/                  # Images and logos
│   ├── components/              # Reusable UI components
│   │   ├── home/                # Homepage sections
│   │   ├── layout/              # Navbar, Footer, language switcher
│   │   ├── sections/            # Shared page sections
│   │   ├── seo/                 # SEO/head management
│   │   ├── transparency/        # Transparency page sections
│   │   ├── dev/                 # Development/test components
│   │   └── ui/                  # Generic UI components
│   ├── data/                    # YAML data loaders and navigation
│   ├── hooks/                   # Custom React hooks
│   ├── i18n/                    # Internationalization setup
│   ├── lib/                     # Utilities and markdown rendering logic
│   ├── pages/                   # Main application pages/routes
│   ├── types/                   # Shared TypeScript types
│   ├── App.tsx                  # Root app component
│   ├── main.tsx                 # App entry point
│   └── styles/                  # Global styles
│
├── scripts/                     # Utility and setup scripts
│   ├── setup-starter-kit.js
│   ├── yaml-to-json.js
│   └── format-files.sh
│
├── terraform/                   # Infrastructure as Code configuration
│   ├── main.tf
│   ├── outputs.tf
│   ├── variables.tf
│   └── terraform.tfvars.example
│
├── .husky/                      # Git hooks
├── docs/                        # Project docs
├── package.json                 # Project dependencies and scripts
├── tailwind.config.js           # TailwindCSS configuration
├── vite.config.ts               # Vite configuration
├── eslint.config.js             # ESLint configuration
├── postcss.config.js            # PostCSS configuration
├── vercel.json                  # Vercel deployment config
├── tsconfig*.json               # TypeScript configurations
│
├── README.md                    # Main project documentation
├── LICENSE                      # Open-source license
└── CLAUDE.md                    # AI assistant/project instructions
```

---

## Contributors

Thanks to everyone who has contributed to BetterTanay! 💙

<a href="https://github.com/s4burieru/bettertanay/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=s4burieru/bettertanay" />
</a>

Made with [contrib.rocks](https://contrib.rocks).

---

## License

This project is licensed under the Creative Commons Zero (CC0) License - see the [LICENSE](LICENSE) file for details.

**CC0 License Benefits:**

- **Public Domain**: No restrictions on use, modification, or distribution
- **Government Friendly**: Perfect for public sector projects
- **Maximum Reusability**: Anyone can use, modify, and distribute freely
- **No Attribution Required**: Though attribution is appreciated

---

## Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS v4](https://tailwindcss.com/)
- UI components by [@bettergov/kapwa](https://github.com/bettergov/kapwa)
- Icons by [Lucide React](https://lucide.dev/)
- Content management with [YAML](https://yaml.org/)
- Internationalization with [i18next](https://www.i18next.com/)

---

## Inspirations

- [BetterGov.PH](https://github.com/bettergovph/bettergov)
- [Betterlocalgov](https://github.com/iyanski/betterlocalgov)
- [BetterSolano.org](http://bettersolano.org)
- [BetterIndang.org](https://betterindang.org)

> ⚠️ **Not an official government website.** For official transactions, visit [tanay.gov.ph](https://tanay.gov.ph/)

---

## NOTICE

This is still under active development. More parts of the README file will be available soon.
