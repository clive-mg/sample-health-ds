Buttons — the core action controls (`Button`, `CloseButton`). Use for any primary/secondary/tertiary action; use `CloseButton` for dismiss affordances on overlays.

```jsx
<Button hierarchy="primary" size="md">Button CTA</Button>
<Button hierarchy="secondary" size="md" iconLeading={<Icon name="Plus" size={20} />}>Add</Button>
<Button hierarchy="link-color" size="md">Learn more</Button>
<CloseButton size="md" />
```

Sizes: sm (36px), md (40px), lg (44px), xl (48px). Hierarchies: `primary`, `secondary`, `tertiary`, `link-gray`, `link-color`, plus `-destructive` variants. `iconOnly` renders a square button; pass the glyph via `iconLeading`.
