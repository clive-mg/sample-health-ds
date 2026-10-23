# Sample Health — Design System

A code-first, compiler-ready design system for **Sample Health**: design tokens, a
full type ramp, a large line-icon library, and a set of reusable React UI
primitives. It's a general-purpose product UI toolkit — use it to build SaaS
dashboards, settings, auth flows, marketing pages and data-dense app screens with
a clean, calm, enterprise-grade aesthetic built on a **blue** primary and a neutral
gray family.

## How the system is presented

- **`docs-rules.md`** — the DocSite's rules, distilled and **binding on any project that
  uses this system**. Read it before designing or writing anything; where it and this
  readme disagree, it wins and this file is stale.
- **`DocSite.html`** — the component documentation site. This is the primary way to
  browse the system: a three-column layout (sidebar, content, on-this-page) with a
  live, exhaustive gallery for every component, grouped into **Foundations**,
  **Base components** and **Application components**. Open this first.
- `docs/` — the docs site's shell, theme and per-category page modules.
- `thumbnail.html` — the homepage brand tile.

## Content fundamentals

- **Voice:** plain, professional, product-first. Short sentences, sentence case.
  Labels are literal ("Team members", "Email", "Add member"), not clever.
- **Casing:** Sentence case for headings, labels and buttons. ALL-CAPS only for tiny
  eyebrow labels (with letter-spacing).
- **Person:** address the user as "you" / "your". System messages are declarative
  ("Payment received").
- **Numbers & data:** concrete and restrained — real-looking names and
  `@samplehealth.com` emails, percentages, counts. No filler stats.
- **Emoji:** none. Meaning is carried by line icons, badges and dots.
- **Tone:** confident and quiet. Helper text is supportive, one line, never chatty.

## Visual foundations

- **Primary color:** blue **Brand 600 `#1570EF`** (hover 700 `#175CD3`). Full 25→950
  ramp. This is the only saturated accent used for actions, focus and links. The
  brand ramp is remapped to blue in `tokens/brand-blue.css`, so every component that
  references `--colors-brand-*` renders in blue.
- **Neutrals:** the gray family — text `#181D27` (900), secondary `#414651` (700),
  tertiary `#535862` (600), placeholder `#717680` (500), borders `#D5D7DA` (300) /
  `#E9EAEB` (200), surfaces white / `#FAFAFA` (50).
- **Data-viz hues:** the raw Figma export carries additional chart hues (indigo, purple,
  pink, rose, orange, yellow, green, teal, cyan, gray-blue, …). Foundations does not
  publish them as colour tokens, so they are not names to annotate or reference — see
  `docs-rules.md` › Gaps.
- **Type:** **Inter** everywhere; **Roboto Mono** for code only. Twelve steps:
  Display 1/2/3 (72/60/48), H1–H6 (36/30/24/20/18/16), Body Large/Medium/Small
  (16/14/12), plus caption & overline at 12. Display and headings are **Semibold 600**
  and carry **-2% tracking** from 36px up; Body Large and Medium are 400 or 600;
  Body Small, caption and overline are 500 or 700. Line heights: 1.2x for display and
  headings, 1.5x for body. Full table in CLAUDE.md.
- **Spacing:** a fixed scale, named none(0)/xxs(2)→11xl(160) — 0, 2, 4, 6, 8, 12, 16, 20,
  24, 32, 40, 48, 64, 80, 96, 128, 160. Every padding, gap and margin comes from it; never
  a raw px value, and never a control height pinned against its own padding.
  **Radius:** controls use md(8), cards use xl(12)/2xl(16), pills use full.
- **Shadows:** a soft, low-opacity elevation ramp (xs→2xl). Cards use xs–sm,
  dropdowns/popovers use lg, modals use xl.
- **Focus:** 4px ring in the brand-500 blue (`color.focusRing`); error fields ring in
  error-500.

## Iconography

- **Line icons** are the entire icon language — **~2,396 glyphs** in
  `assets/icons/icon-data.js`, drawn on a 24×24 grid, painting with `currentColor`.
- Render with the `Icon` component: `<Icon name="ArrowRight" size={20} />`. Names are
  PascalCase (`SearchLg`, `Settings01`, `ChevronDown`, `AlertCircle`).
  `assets/icons/Icon.d.ts` is the full name index.
- **No emoji.** Featured/announcement contexts wrap an icon in the `FeaturedIcon` chip.

## Assets & logo

- The **footer logo** is `assets/logo-footer.svg` / `<SampleHealthLogo>`: one colour, defaulting to the theme primary (`color.primary.600`), so it follows the active theme.
- The **product lockup** is `assets/logo-nav.png` — the blue heart/pill mark plus a
  two-line "Sample Health" wordmark. This is the one to use in UI chrome (`TopNav`,
  `SidebarNav`). Reversed for dark and brand surfaces: `assets/logo-nav-white.png`, used by both the dark and brand themes.
- The **mark alone** is `assets/logo-nav-mark.png` / `assets/logo-nav-mark-white.png`, for the
  64px collapsed `SidebarRail` and anywhere the wordmark will not fit.
- `assets/logo.png` is the **design-system** lockup — the same mark and wordmark with
  "DESIGN SYSTEM" set underneath. It belongs to the docs site chrome only; never put it
  in a product nav, where it would read as the product's name.

## Fonts

- **Inter** and **Roboto Mono** load from Google Fonts (`tokens/fonts.css`).

## Components (built)

Grouped React primitives under `components/` (namespace exposed on `window`):

- **buttons/** — `Button`, `CloseButton`, `ButtonGroup`, `ButtonUtility`
- **forms/** — `Input`, `TextArea`, `Select`, `MultiSelect`, `Checkbox`, `RadioButton`, `Toggle`, `Slider`, `FileUpload`, `OTPInput`, `SearchInput`
- **data-display/** — `Avatar`, `AvatarButton`, `AvatarGroup`, `AvatarLabelGroup`, `AvatarProfilePhoto`, `Badge`, `BadgeGroup`, `Tooltip`, `Carousel`, `MessageBubble`, `MetricCard`, `ActivityFeed`, `Rating`
- **feedback/** — `FeaturedIcon`, `Alert`, `Toast`, `ProgressBar`, `ProgressCircle`, `LoadingIndicator`, `EmptyState`
- **navigation/** — `TopNav`, `SidebarNav`, `SidebarRail`, `NavUtilityBar`, `Tabs`, `Breadcrumbs`, `Pagination`, `ProgressSteps`
- **overlays/** — `Modal`, `Dropdown`, `CommandMenu`
- **layout/** — `Table`, `Divider`, `Card`, `CardHeader`, `PageHeader`, `SectionHeader`
- **charts/** — `BarChart`, `LineChart`, `PieChart`, `RadarChart`, `ActivityGauge`
- **date/** — `Calendar`, `DatePicker`, `DateRangePicker`, `DateRangeFields`
- **media/** — `VideoPlayer`; **mockups/** — `BrowserMockup`, `PhoneMockup`, `AppStoreBadge`
- **content/** — `CodeSnippet`, `EmailTemplate`
- **marketing/** & **sections/** — header/footer, pricing, testimonial and full
  marketing section compositions
- **assets/icons/** — `Icon` (+ ~2,396 glyphs)

## Index / manifest

- `styles.css` — global entry (import this one file). `@import`s:
  - `tokens/fonts.css` — Inter + Roboto Mono
  - `tokens/fig-tokens.css` — all design variables (colors, type, spacing, radius)
  - `tokens/scale.css` — px-unit aliases + type-size/family vars
  - `tokens/typography.css` — type utility classes
  - `tokens/brand-blue.css` — remaps the brand ramp to blue
- `components/<group>/` — React primitives (`.jsx` + `.d.ts` + `.prompt.md`)
- `assets/icons/` — `icon-data.js` (load as a plain `<script>` before `_ds_bundle.js`), `Icon.jsx`, `Icon.d.ts`
- `ui_kits/<product>/` — full-screen product recreations
- `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json` — generated, do not edit

## Component index

Every component compiled into this system (public primitives plus the internal build-blocks they compose), for reference:

Accordion, AccountCard, SampleHealthLogo, AccountCardDesktop, ActivityFeed, ActivityGauge, ActivityGaugeLegend, Alert, AppDownloadSection, ApplicationNavMenuButton, AppStoreBadge, AssigneeSelect, Avatar, AvatarAddButton, AvatarButton, AvatarCompanyIcon, AvatarContrastBorder, AvatarGroup, AvatarImage, AvatarLabelGroup, AvatarOnlineIndicator, AvatarProfilePhoto, BackgroundGridBlock, BackgroundGridCheckBlock, BackgroundMask, BackgroundOverlay, BackgroundPattern, BackgroundPatternDecorative, Badge, BadgeCloseX, BadgeGroup, Banner, BannerIcon, BarChart, BlogPageHeader, BlogPostCard, BlogPostCardHorizontal, BlogPostPageHeader, BlogSection, BlogSubscribeCard, BlurCard, BreadcrumbButton, BreadcrumbDivider, BreadcrumbHome, Breadcrumbs, BrowserMockup, BrowserToolbar, BudgetCard, BudgetCategory, Button, ButtonGroup, ButtonGroupBase, ButtonLoadingIcon, ButtonUtility, Calendar, CalendarCell, CalendarCellDate, CalendarCellDayWeek, CalendarCellMonth, CalendarColumnHeader, CalendarEvent, CalendarHeader, CalendarRowLabel, CalendarTimeMarker, CalendarViewDropdown, Card, CardBase, CardHeader, CardHeaderAvatar, CardHeaderMobile, CareersSection, Carousel, CarouselArrow, CarouselImage, Change, ChartData, ChartLegend, ChartMarker, ChartMini, ChatListItem, Checkbox, CheckboxBase, CheckIcon, CheckItemText, CloseButton, CodeSnippet, CodeSnippetTabs, ColorPicker, ColorSelect, CommandBarFooter, CommandBarMenuSection, CommandBarNavigationIcon, CommandDropdownMenuItem, CommandInput, CommandMenu, CommandMenuHeader, CommandShortcut, Comment, CompanyLogo, CompanyWordmark, ContactBlock, ContactPageHeader, ContactSection, ContactSectionSplit, ContactText, Container, ContentDivider, ContentItem, ContentSection, ControlHandle, CookieBanner, CopyField, Country, CountryFlag, CreditCardMockup, CTASection, Cursor, DashboardStatCard, DateInputField, DatePicker, DatePickerListItem, DatePickerMenu, DateRangeFields, DateRangePicker, DesignNote, DesignSystemHeader, Divider, DividerText, DocumentationTableCell, DocumentationUser, Dot, DotIndicator, Dropdown, DropdownHeaderNavigation, DropdownHeaderNavigationButton, DropdownHeaderNavigationSubMenu, DropdownHeaderNavigationTrigger, DropdownListHeader, DropdownListItem, EmailTemplate, EmailTemplateFooter, EmailTemplateHeader, EmailVerification, Emoji, EmptyState, FAQItem, FAQSection, FeatureCard, FeaturedIcon, FeatureIconTop, FeatureList, FeatureSection, FeaturesSectionAlt, FeatureTab, FeatureTabHorizontal, FeatureText, FeedItem, FeedItemActivity, FeedItemConnector, FieldHelpIcon, FileUpload, FileUploadBase, FileUploadItem, FileUploadItemBase, FilterButton, FilterTag, FocusRing, FocusRingCard, Footer, FooterLarge, FooterLink, FooterLinksColumn, FullWidthHeaderNavSubMenu, GoogleMapsMockup, HeaderBanner, HeaderDropdownButton, HeaderNav, HeaderSection, HeroSection, Icon, InlineCTA, InlineCTABanner, Input, InputAddon, IntegrationCard, IntegrationCardMobile, IntegrationRow, IPhoneMockupHome, IPhoneStatusBar, JobCard, JobPost, KanbanCard, KanbanColumn, KbdCombo, Key, KeyboardKey, LegalPage, Legend, LineChart, ListingSearchResult, LoadingDots, LoadingIndicator, LogoStrip, MapLocationMarker, MapMarker, MapMockup, MarketingPageHeader, MeasureLine, MegaInput, MegaInputFieldBase, Message, MessageActionButton, MessageActionPanel, MessageBubble, MessageComposer, MessageReaction, MessageStatusIcon, MetricCard, MetricChange, MetricItem, MetricItemChart, MetricsSection, MetricsSectionCards, MobileTabBar, Modal, ModalActions, ModalHeader, MultiSelect, NavAccountCard, NavAccountCardMenuItem, NavFeaturedCard, NavigationActions, NavItemBase, NavItemButton, NavItemButtonBase, NavItemCard, NavItemDropdownBase, NavMenuButton, NavMenuItem, NavMenuItemCard, NavPromoCard, NewsletterCTASection, NewsletterSectionSplit, NotFoundSection, NotificationBell, NotificationCard, NotificationItem, NumberInput, OTPInput, PageHeader, PageHeaderTabs, Pagination, PaginationButtonGroup, PaginationDot, PaginationNumber, PhoneMockup, PieChart, PlayButton, PricingFeatureRow, PricingSection, PricingTableCell, PricingTableCellHeader, PricingTierCard, PricingToggle, ProductCard, ProfileHeader, ProgressBar, ProgressBarLabeled, ProgressCircle, ProgressRingSmall, ProgressStepConnector, ProgressSteps, QuantityStepper, QuoteImageBottomPanel, QuotePanel, RadarChart, RadioButton, RadiusCard, RadiusExample, RangeSlider, Rating, RatingBar, RatingInput, RatingStar, ReactionBar, ReviewCard, ScreenMockup, ScrollBar, SearchBarLarge, SearchInput, SearchResultItem, SectionDivider, SectionFooter, SectionFooterDark, SectionHeader, SectionHeaderActions, SectionHeaderCentered, SectionHeaderIcon, SegmentedControl, Select, SelectMenuItem, SettingRow, ShadowCard, SidebarSection, Skeleton, SlideOutMenuHeader, Slider, SliderLabel, SliderWithTooltip, SocialButton, SocialButtonBrand, SocialButtonGroup, SocialIconButton, SocialLinks, SocialProofLogos, SocialProofSection, SocialProofStars, SpacingExample, StackedCards, StatCardSimple, StatPill, StatsSectionDark, StatTrend, StatWithIcon, StepBase, StepIcon, StepIconBase, StepperHeader, SwatchBase, TabButton, TabButtonBase, Table, TableCell, TableCellLead, TableHeaderCell, TableHeaderLabel, TableLeadCellPrimary, TableRow, Tabs, TabUnderline, Tag, TagCheckbox, TagCloseX, TagCount, TagGroup, TeamMember, TeamMemberMobile, TeamSection, TestimonialCard, TestimonialCarouselArrow, TestimonialLarge, TestimonialLogo, TestimonialRating, TestimonialSection, TestimonialSimple, TextArea, TextEditor, TextEditorIcon, TimelineConnector, TimelineItem, Toast, ToastProgress, ToastSimple, Toggle, ToggleBase, ToggleSlim, ToggleText, Toolbar, Tooltip, TrendBadge, TrustElement, UploadProgressCard, VariablesIcon, VerificationCodeCell, VerifiedBadge, VerifiedTick, VideoActionButton, VideoActionsBar, VideoActionTooltip, VideoLargeActionButton, VideoOverlayAction, VideoPlayer, VideoProgress, VideoVolumeSlider, WidthExample, WizardStepDot, XAxis, YAxis
