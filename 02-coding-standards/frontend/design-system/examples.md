# EXAMPLES - DESIGN SYSTEM

← Quay lại: [README.md](./README.md)

## Tổng quan

Tài liệu này cung cấp code examples cho common patterns sử dụng design system của Tutor Platform. Tất cả examples đều tuân theo design system guidelines và best practices.

## Common Patterns

### Card Layout

**Standard Card:**
```tsx
// ✅ ĐÚNG: Standard card với proper spacing và styling
<div className="
  bg-white 
  dark:bg-gray-dark 
  border 
  border-gray-200 
  dark:border-gray-800 
  rounded-lg 
  p-6 
  shadow-theme-sm
">
  <h3 className="text-title-md font-medium text-gray-900 dark:text-white/90 mb-2">
    Card Title
  </h3>
  <p className="text-theme-sm font-normal text-gray-700 dark:text-gray-300 mb-4">
    Card description and content goes here. This is a standard card layout
    with proper typography, spacing, and dark mode support.
  </p>
  <div className="flex gap-4">
    <Button variant="primary">Primary Action</Button>
    <Button variant="outline">Secondary Action</Button>
  </div>
</div>
```

**Card Grid:**
```tsx
// ✅ ĐÚNG: Responsive card grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {cards.map((card) => (
    <div
      key={card.id}
      className="
        bg-white 
        dark:bg-gray-dark 
        border 
        border-gray-200 
        dark:border-gray-800 
        rounded-lg 
        p-4 
        shadow-theme-sm
        hover:shadow-theme-md
        transition-shadow
        duration-normal
      "
    >
      <h3 className="text-title-sm font-medium mb-2">{card.title}</h3>
      <p className="text-theme-sm font-normal text-gray-700 dark:text-gray-300">
        {card.description}
      </p>
    </div>
  ))}
</div>
```

### Form Layout

**Standard Form:**
```tsx
// ✅ ĐÚNG: Complete form với validation
<form className="space-y-4" onSubmit={handleSubmit}>
  <div>
    <label 
      htmlFor="email" 
      className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
    >
      Email Address
    </label>
    <InputField
      id="email"
      type="email"
      placeholder="Enter your email"
      error={errors.email}
      hint={errors.email ? "Email không hợp lệ" : "We'll never share your email"}
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>

  <div>
    <label 
      htmlFor="password" 
      className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
    >
      Password
    </label>
    <InputField
      id="password"
      type="password"
      placeholder="Enter your password"
      error={errors.password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>

  <div className="flex items-center">
    <Checkbox
      label="Remember me"
      checked={rememberMe}
      onChange={setRememberMe}
    />
  </div>

  <Button 
    variant="primary" 
    type="submit"
    disabled={loading}
    loading={loading}
  >
    Sign In
  </Button>
</form>
```

**Form với Multiple Fields:**
```tsx
// ✅ ĐÚNG: Form với sections
<form className="space-y-6">
  <section>
    <h2 className="text-title-md font-medium mb-4">Personal Information</h2>
    <div className="space-y-4">
      <div>
        <label className="block text-theme-sm font-medium mb-2">First Name</label>
        <InputField placeholder="Enter first name" />
      </div>
      <div>
        <label className="block text-theme-sm font-medium mb-2">Last Name</label>
        <InputField placeholder="Enter last name" />
      </div>
    </div>
  </section>

  <section>
    <h2 className="text-title-md font-medium mb-4">Contact Information</h2>
    <div className="space-y-4">
      <div>
        <label className="block text-theme-sm font-medium mb-2">Email</label>
        <InputField type="email" placeholder="Enter email" />
      </div>
      <div>
        <label className="block text-theme-sm font-medium mb-2">Phone</label>
        <PhoneInput value={phone} onChange={setPhone} />
      </div>
    </div>
  </section>

  <div className="flex gap-4">
    <Button variant="primary">Save</Button>
    <Button variant="outline">Cancel</Button>
  </div>
</form>
```

### Button Groups

**Horizontal Button Group:**
```tsx
// ✅ ĐÚNG: Button group với proper spacing
<div className="flex gap-4">
  <Button variant="primary">Primary</Button>
  <Button variant="outline">Secondary</Button>
  <Button variant="outline">Cancel</Button>
</div>
```

**Vertical Button Group:**
```tsx
// ✅ ĐÚNG: Vertical button group
<div className="flex flex-col gap-3">
  <Button variant="primary" className="w-full">Primary Action</Button>
  <Button variant="outline" className="w-full">Secondary Action</Button>
</div>
```

**Button Group với Icons:**
```tsx
// ✅ ĐÚNG: Button group với icons
<div className="flex gap-4">
  <Button variant="primary" startIcon={<SaveIcon />}>
    Save
  </Button>
  <Button variant="outline" startIcon={<DownloadIcon />}>
    Download
  </Button>
  <Button variant="outline" endIcon={<ArrowRightIcon />}>
    Next
  </Button>
</div>
```

### Component Combinations

**Card với Form:**
```tsx
// ✅ ĐÚNG: Card chứa form
<div className="
  bg-white 
  dark:bg-gray-dark 
  border 
  border-gray-200 
  dark:border-gray-800 
  rounded-lg 
  p-6 
  shadow-theme-sm
">
  <h2 className="text-title-lg font-medium mb-4">Create Account</h2>
  <form className="space-y-4">
    <div>
      <label className="block text-theme-sm font-medium mb-2">Email</label>
      <InputField type="email" placeholder="Enter email" />
    </div>
    <div>
      <label className="block text-theme-sm font-medium mb-2">Password</label>
      <InputField type="password" placeholder="Enter password" />
    </div>
    <Button variant="primary" className="w-full">Create Account</Button>
  </form>
</div>
```

**Card với List:**
```tsx
// ✅ ĐÚNG: Card chứa list
<div className="
  bg-white 
  dark:bg-gray-dark 
  border 
  border-gray-200 
  dark:border-gray-800 
  rounded-lg 
  p-6 
  shadow-theme-sm
">
  <h3 className="text-title-md font-medium mb-4">Recent Activities</h3>
  <ul className="space-y-3">
    {activities.map((activity) => (
      <li 
        key={activity.id}
        className="
          flex 
          items-center 
          gap-3 
          p-3 
          bg-gray-50 
          dark:bg-gray-800 
          rounded-lg
        "
      >
        <Avatar src={activity.avatar} size="small" />
        <div className="flex-1">
          <p className="text-theme-sm font-medium">{activity.title}</p>
          <p className="text-theme-xs text-gray-500 dark:text-gray-400">
            {activity.time}
          </p>
        </div>
        <Badge variant="light" color="primary">
          {activity.status}
        </Badge>
      </li>
    ))}
  </ul>
</div>
```

**Modal với Form:**
```tsx
// ✅ ĐÚNG: Modal chứa form
<Modal isOpen={isOpen} onClose={handleClose}>
  <div className="p-6">
    <h2 className="text-title-lg font-medium mb-4">Edit Profile</h2>
    <form className="space-y-4">
      <div>
        <label className="block text-theme-sm font-medium mb-2">Name</label>
        <InputField placeholder="Enter name" />
      </div>
      <div>
        <label className="block text-theme-sm font-medium mb-2">Email</label>
        <InputField type="email" placeholder="Enter email" />
      </div>
      <div className="flex gap-4 pt-4">
        <Button variant="primary" className="flex-1">Save</Button>
        <Button variant="outline" className="flex-1" onClick={handleClose}>
          Cancel
        </Button>
      </div>
    </form>
  </div>
</Modal>
```

## Dark Mode Examples

### Card trong Dark Mode

```tsx
// ✅ ĐÚNG: Card với full dark mode support
<div className="
  bg-white 
  dark:bg-gray-dark 
  border 
  border-gray-200 
  dark:border-gray-800 
  rounded-lg 
  p-6 
  shadow-theme-sm
">
  <h3 className="
    text-title-md 
    font-medium 
    text-gray-900 
    dark:text-white/90 
    mb-2
  ">
    Card Title
  </h3>
  <p className="
    text-theme-sm 
    font-normal 
    text-gray-700 
    dark:text-gray-300
  ">
    Card content với proper dark mode colors
  </p>
</div>
```

### Button trong Dark Mode

```tsx
// ✅ ĐÚNG: Button với dark mode support
<Button 
  variant="outline"
  className="
    bg-white 
    dark:bg-gray-800 
    text-gray-700 
    dark:text-gray-400 
    ring-1 
    ring-gray-300 
    dark:ring-gray-700
    hover:bg-gray-50 
    dark:hover:bg-white/[0.03]
    hover:text-gray-900 
    dark:hover:text-gray-300
  "
>
  Button
</Button>
```

## Responsive Examples

### Responsive Grid

```tsx
// ✅ ĐÚNG: Responsive grid với proper breakpoints
<div className="
  grid 
  grid-cols-1 
  sm:grid-cols-2 
  md:grid-cols-3 
  lg:grid-cols-4 
  gap-4 
  md:gap-6
">
  {items.map((item) => (
    <div key={item.id} className="p-4 bg-white dark:bg-gray-dark rounded-lg">
      {item.content}
    </div>
  ))}
</div>
```

### Responsive Typography

```tsx
// ✅ ĐÚNG: Responsive typography
<h1 className="
  text-title-lg 
  md:text-title-xl 
  lg:text-title-2xl 
  font-medium
">
  Responsive Heading
</h1>

<p className="
  text-theme-xs 
  md:text-theme-sm 
  lg:text-theme-xl
">
  Responsive body text
</p>
```

### Responsive Spacing

```tsx
// ✅ ĐÚNG: Responsive spacing
<div className="
  p-4 
  md:p-6 
  lg:p-8
">
  <section className="
    mb-4 
    md:mb-6 
    lg:mb-8
  ">
    Section content
  </section>
</div>
```

## Animation Examples

### Button với Animations

```tsx
// ✅ ĐÚNG: Button với complete animations
<button className="
  bg-brand-500 
  text-white 
  shadow-theme-xs
  hover:bg-brand-600 
  hover:scale-[1.02] 
  hover:shadow-theme-sm
  active:scale-[0.98]
  disabled:opacity-50 
  disabled:cursor-not-allowed
  transition-all 
  duration-normal 
  ease-out
">
  {loading ? (
    <svg className="animate-spin h-4 w-4">
      <circle className="opacity-25" cx="12" cy="12" r="10" />
      <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  ) : (
    'Submit'
  )}
</button>
```

### List với Stagger Animation

```tsx
// ✅ ĐÚNG: List với stagger animation
<div className="space-y-4">
  {items.map((item, index) => (
    <div
      key={item.id}
      className="
        opacity-0 
        translate-y-2
        animate-fade-in 
        animate-slide-up
        bg-white 
        dark:bg-gray-dark 
        rounded-lg 
        p-4
      "
      style={{
        animationDelay: `${index * 50}ms`,
        animationFillMode: 'forwards',
      }}
    >
      <h3 className="text-title-sm font-medium">{item.title}</h3>
      <p className="text-theme-sm font-normal text-gray-700 dark:text-gray-300">
        {item.description}
      </p>
    </div>
  ))}
</div>
```

### Modal với Animations

```tsx
// ✅ ĐÚNG: Modal với smooth animations
<div className={`
  fixed inset-0 
  flex items-center justify-center 
  z-99999
  transition-opacity 
  duration-normal 
  ease-out
  ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
`}>
  <div 
    className="
      fixed inset-0 
      bg-gray-400/50 
      backdrop-blur-[32px]
      transition-opacity 
      duration-normal
    "
    onClick={handleClose}
  />
  <div className={`
    relative 
    bg-white 
    dark:bg-gray-dark 
    rounded-xl 
    p-6 
    shadow-theme-lg
    max-w-md 
    w-full
    transition-all 
    duration-normal 
    ease-out
    ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
  `}>
    <h2 className="text-title-lg font-medium mb-4">Modal Title</h2>
    <p className="text-theme-sm font-normal text-gray-700 dark:text-gray-300">
      Modal content
    </p>
  </div>
</div>
```

## Real-world Examples

### Dashboard Layout

```tsx
// ✅ ĐÚNG: Complete dashboard layout
<div className="p-6">
  <h1 className="text-title-xl font-medium text-gray-900 dark:text-white/90 mb-4">
    Dashboard
  </h1>
  
  {/* Stats Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {stats.map((stat) => (
      <div
        key={stat.id}
        className="
          bg-white 
          dark:bg-gray-dark 
          border 
          border-gray-200 
          dark:border-gray-800 
          rounded-lg 
          p-4 
          shadow-theme-sm
        "
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-50 dark:bg-brand-500/15 rounded-lg">
            {stat.icon}
          </div>
          <div>
            <p className="text-theme-xs text-gray-500 dark:text-gray-400">
              {stat.label}
            </p>
            <p className="text-title-md font-medium text-gray-900 dark:text-white/90">
              {stat.value}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Recent Activities */}
  <section className="mb-8">
    <h2 className="text-title-lg font-medium text-gray-900 dark:text-white/90 mb-4">
      Recent Activities
    </h2>
    <div className="
      bg-white 
      dark:bg-gray-dark 
      border 
      border-gray-200 
      dark:border-gray-800 
      rounded-lg 
      p-6 
      shadow-theme-sm
    ">
      <ul className="space-y-4">
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-center gap-4">
            <Avatar src={activity.avatar} size="medium" status="online" />
            <div className="flex-1">
              <p className="text-theme-sm font-medium text-gray-900 dark:text-white/90">
                {activity.title}
              </p>
              <p className="text-theme-xs text-gray-500 dark:text-gray-400">
                {activity.time}
              </p>
            </div>
            <Badge variant="light" color="primary">
              {activity.status}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  </section>
</div>
```

### Form với Validation

```tsx
// ✅ ĐÚNG: Form với complete validation
<form className="space-y-6" onSubmit={handleSubmit}>
  <div>
    <label 
      htmlFor="email" 
      className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
    >
      Email Address
    </label>
    <InputField
      id="email"
      type="email"
      placeholder="Enter your email"
      error={errors.email}
      success={!errors.email && touched.email}
      hint={errors.email || "We'll never share your email"}
      onChange={(e) => {
        setEmail(e.target.value);
        setTouched({ ...touched, email: true });
      }}
    />
  </div>

  <div>
    <label 
      htmlFor="password" 
      className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
    >
      Password
    </label>
    <InputField
      id="password"
      type="password"
      placeholder="Enter your password"
      error={errors.password}
      hint={errors.password}
      onChange={(e) => {
        setPassword(e.target.value);
        setTouched({ ...touched, password: true });
      }}
    />
  </div>

  {errors.submit && (
    <Alert
      variant="error"
      title="Error"
      message={errors.submit}
    />
  )}

  <div className="flex gap-4">
    <Button 
      variant="primary" 
      type="submit"
      disabled={loading}
      loading={loading}
      className="flex-1"
    >
      Sign In
    </Button>
    <Button 
      variant="outline" 
      type="button"
      onClick={handleCancel}
      className="flex-1"
    >
      Cancel
    </Button>
  </div>
</form>
```

## Tài liệu liên quan

- [Components](./components.md) - Component documentation
- [Guidelines](./guidelines.md) - Best practices
- [Colors](./colors.md) - Color usage
- [Typography](./typography.md) - Typography usage
- [Spacing](./spacing.md) - Spacing usage
- [Animations](./animations.md) - Animation usage

---

← Quay lại: [README.md](./README.md)
