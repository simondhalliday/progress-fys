# FYS: Progress

Public course site for **AS.001.219, FYS: Progress**, taught in Fall 2026 at Johns Hopkins University by Simon D. Halliday.

Course site: <https://progress.simondhalliday.com>

The site is built with [Quarto](https://quarto.org/) and served through GitHub Pages from the rendered `docs/` directory.

## Repository Structure

- `index.qmd` - course home page
- `syllabus.qmd` - syllabus and course calendar
- `assignments.qmd` - assignments and policies
- `baltimore.qmd` - Baltimore course map and visit suggestions
- `session-notes/` - session-level pages
- `docs/` - rendered site output for GitHub Pages
- `reading_packet_plan.md` - planning notes for print reading packets and library/course-reserve follow-up

## Updating The Site

Render the Quarto site before committing:

```sh
quarto render
```

Then commit both the changed source files and the rendered files under `docs/`. GitHub Pages should be configured to publish from the `docs/` folder on the `main` branch.

Copyrighted readings and downloaded PDFs should not be committed to this public repository. Use library course reserves, licensed links, or locally managed print packets for those materials.
