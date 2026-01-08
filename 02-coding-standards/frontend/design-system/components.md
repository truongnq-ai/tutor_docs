# COMPONENTS - DESIGN SYSTEM

← Quay lại: [README.md](./README.md)

## Tổng quan

Component library của Tutor Platform bao gồm UI components, form components, utility classes, và styling cho third-party libraries. Tất cả components được xây dựng với TypeScript, Tailwind CSS, và tuân theo design system tokens.

## Component Principles

1. **Reusability**: Components có thể reuse trong nhiều contexts
2. **Composability**: Components có thể combine với nhau
3. **Accessibility**: Tất cả components đều accessible (keyboard navigation, ARIA labels)
4. **Type Safety**: Sử dụng TypeScript interfaces cho props
5. **Dark Mode**: Tất cả components hỗ trợ dark mode
6. **Responsive**: Components tự động adapt với responsive breakpoints

## UI Components

### Button

**Location:** `src/components/ui/button/Button.tsx`

**Props:**
- `children`: ReactNode - Button text hoặc content
- `size?`: "sm" | "md" - Button size (default: "md")
- `variant?`: "primary" | "outline" - Button variant (default: "primary")
- `startIcon?`: ReactNode - Icon trước text
- `endIcon?`: ReactNode - Icon sau text
- `onClick?`: () => void - Click handler
- `disabled?`: boolean - Disabled state (default: false)
- `className?`: string - Additional classes

**Sizes:**
- `sm`: `px-4 py-3 text-sm` (16px horizontal, 12px vertical)
- `md`: `px-5 py-3.5 text-sm` (20px horizontal, 14px vertical)

**Variants:**
- `primary`: `bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300`
- `outline`: `bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300`

**Examples:**
```tsx
// ✅ ĐÚNG: Primary button
<Button variant="primary" size="md" onClick={handleClick}>
  Submit
</Button>

// ✅ ĐÚNG: Outline button với icon
<Button variant="outline" startIcon={<Icon />}>
  Cancel
</Button>

// ✅ ĐÚNG: Small button
<Button size="sm" variant="primary">
  Small Button
</Button>

// ✅ ĐÚNG: Disabled button
<Button disabled>
  Disabled
</Button>
```

### Alert

**Location:** `src/components/ui/alert/Alert.tsx`

**Props:**
- `variant`: "success" | "error" | "warning" | "info" - Alert type
- `title`: string - Alert title
- `message`: string - Alert message
- `showLink?`: boolean - Show "Learn More" link (default: false)
- `linkHref?`: string - Link URL (default: "#")
- `linkText?`: string - Link text (default: "Learn more")

**Variants:**
- `success`: Green background với success icon
- `error`: Red background với error icon
- `warning`: Orange background với warning icon
- `info`: Blue background với info icon

**Examples:**
```tsx
// ✅ ĐÚNG: Success alert
<Alert
  variant="success"
  title="Thành công"
  message="Thao tác đã được thực hiện thành công."
/>

// ✅ ĐÚNG: Error alert với link
<Alert
  variant="error"
  title="Lỗi"
  message="Đã xảy ra lỗi. Vui lòng thử lại."
  showLink={true}
  linkHref="/help"
  linkText="Xem hướng dẫn"
/>

// ✅ ĐÚNG: Warning alert
<Alert
  variant="warning"
  title="Cảnh báo"
  message="Vui lòng kiểm tra lại thông tin trước khi tiếp tục."
/>
```

### Badge

**Location:** `src/components/ui/badge/Badge.tsx`

**Props:**
- `variant?`: "light" | "solid" - Badge variant (default: "light")
- `size?`: "sm" | "md" - Badge size (default: "md")
- `color?`: "primary" | "success" | "error" | "warning" | "info" | "light" | "dark" - Badge color (default: "primary")
- `startIcon?`: ReactNode - Icon trước text
- `endIcon?`: ReactNode - Icon sau text
- `children`: ReactNode - Badge content

**Examples:**
```tsx
// ✅ ĐÚNG: Primary badge
<Badge variant="light" color="primary">
  New
</Badge>

// ✅ ĐÚNG: Success badge với icon
<Badge variant="solid" color="success" startIcon={<CheckIcon />}>
  Active
</Badge>

// ✅ ĐÚNG: Small error badge
<Badge size="sm" variant="light" color="error">
  Error
</Badge>
```

### Avatar

**Location:** `src/components/ui/avatar/Avatar.tsx`

**Props:**
- `src`: string - Avatar image URL
- `alt?`: string - Alt text (default: "User Avatar")
- `size?`: "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge" - Avatar size (default: "medium")
- `status?`: "online" | "offline" | "busy" | "none" - Status indicator (default: "none")

**Sizes:**
- `xsmall`: 24px (h-6 w-6)
- `small`: 32px (h-8 w-8)
- `medium`: 40px (h-10 w-10)
- `large`: 48px (h-12 w-12)
- `xlarge`: 56px (h-14 w-14)
- `xxlarge`: 64px (h-16 w-16)

**Examples:**
```tsx
// ✅ ĐÚNG: Avatar với status
<Avatar
  src="/avatar.jpg"
  alt="User Avatar"
  size="medium"
  status="online"
/>

// ✅ ĐÚNG: Large avatar
<Avatar
  src="/avatar.jpg"
  size="large"
/>
```

### Modal

**Location:** `src/components/ui/modal/index.tsx`

**Props:**
- `isOpen`: boolean - Modal visibility
- `onClose`: () => void - Close handler
- `children`: ReactNode - Modal content
- `className?`: string - Additional classes
- `showCloseButton?`: boolean - Show close button (default: true)
- `isFullscreen?`: boolean - Fullscreen modal (default: false)

**Features:**
- ESC key để close
- Click outside để close (nếu không fullscreen)
- Body scroll lock khi mở
- Backdrop blur effect

**Examples:**
```tsx
// ✅ ĐÚNG: Standard modal
<Modal isOpen={isOpen} onClose={handleClose}>
  <div className="p-6">
    <h2 className="text-title-lg font-medium mb-4">Modal Title</h2>
    <p className="text-theme-sm font-normal">Modal content</p>
  </div>
</Modal>

// ✅ ĐÚNG: Fullscreen modal
<Modal isOpen={isOpen} onClose={handleClose} isFullscreen={true}>
  <div className="p-6">Fullscreen content</div>
</Modal>
```

### Dropdown

**Location:** `src/components/ui/dropdown/Dropdown.tsx`, `DropdownItem.tsx`

**Usage:**
```tsx
// ✅ ĐÚNG: Dropdown menu
<Dropdown>
  <DropdownItem onClick={handleAction1}>Action 1</DropdownItem>
  <DropdownItem onClick={handleAction2}>Action 2</DropdownItem>
</Dropdown>
```

### Table

**Location:** `src/components/ui/table/index.tsx`

**Usage:**
```tsx
// ✅ ĐÚNG: Table component
<Table>
  <thead>
    <tr>
      <th>Column 1</th>
      <th>Column 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
    </tr>
  </tbody>
</Table>
```

## Form Components

### InputField

**Location:** `src/components/form/input/InputField.tsx`

**Props:**
- `type?`: "text" | "number" | "email" | "password" | "date" | "time" | string - Input type (default: "text")
- `id?`: string - Input ID
- `name?`: string - Input name
- `placeholder?`: string - Placeholder text
- `defaultValue?`: string | number - Default value
- `onChange?`: (e: React.ChangeEvent<HTMLInputElement>) => void - Change handler
- `className?`: string - Additional classes
- `disabled?`: boolean - Disabled state (default: false)
- `success?`: boolean - Success state (default: false)
- `error?`: boolean - Error state (default: false)
- `hint?`: string - Hint text

**States:**
- **Default**: Gray border, brand focus ring
- **Success**: Green border, success colors
- **Error**: Red border, error colors
- **Disabled**: Gray background, disabled cursor

**Examples:**
```tsx
// ✅ ĐÚNG: Default input
<InputField
  type="text"
  placeholder="Enter text"
  onChange={handleChange}
/>

// ✅ ĐÚNG: Input với error state
<InputField
  type="email"
  placeholder="Enter email"
  error={true}
  hint="Email không hợp lệ"
/>

// ✅ ĐÚNG: Input với success state
<InputField
  type="text"
  success={true}
  hint="Thông tin hợp lệ"
/>
```

### TextArea

**Location:** `src/components/form/input/TextArea.tsx`

**Props:**
- Tương tự InputField
- `rows?`: number - Number of rows

**Examples:**
```tsx
// ✅ ĐÚNG: TextArea
<TextArea
  placeholder="Enter description"
  rows={4}
  onChange={handleChange}
/>
```

### Select

**Location:** `src/components/form/Select.tsx`

**Props:**
- `options`: Array<{ value: string; label: string }> - Select options
- `placeholder?`: string - Placeholder text (default: "Select an option")
- `onChange`: (value: string) => void - Change handler
- `className?`: string - Additional classes
- `defaultValue?`: string - Default value

**Examples:**
```tsx
// ✅ ĐÚNG: Select dropdown
<Select
  options={[
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
  ]}
  placeholder="Chọn option"
  onChange={handleChange}
/>
```

### Checkbox

**Location:** `src/components/form/input/Checkbox.tsx`

**Props:**
- `label?`: string - Checkbox label
- `checked`: boolean - Checked state
- `onChange`: (checked: boolean) => void - Change handler
- `id?`: string - Checkbox ID
- `className?`: string - Additional classes
- `disabled?`: boolean - Disabled state (default: false)

**Examples:**
```tsx
// ✅ ĐÚNG: Checkbox với label
<Checkbox
  label="I agree to terms"
  checked={isChecked}
  onChange={setIsChecked}
/>

// ✅ ĐÚNG: Checkbox không label
<Checkbox
  checked={isChecked}
  onChange={setIsChecked}
/>
```

### Radio

**Location:** `src/components/form/input/Radio.tsx`, `RadioSm.tsx`

**Props:**
- Tương tự Checkbox
- `value?`: string - Radio value
- `name?`: string - Radio group name

**Examples:**
```tsx
// ✅ ĐÚNG: Radio group
<div>
  <Radio
    name="option"
    value="1"
    label="Option 1"
    checked={selectedValue === "1"}
    onChange={() => setSelectedValue("1")}
  />
  <Radio
    name="option"
    value="2"
    label="Option 2"
    checked={selectedValue === "2"}
    onChange={() => setSelectedValue("2")}
  />
</div>
```

### Switch

**Location:** `src/components/form/switch/Switch.tsx`

**Props:**
- `label`: string - Switch label
- `defaultChecked?`: boolean - Default checked state (default: false)
- `disabled?`: boolean - Disabled state (default: false)
- `onChange?`: (checked: boolean) => void - Change handler
- `color?`: "blue" | "gray" - Switch color (default: "blue")

**Examples:**
```tsx
// ✅ ĐÚNG: Switch với blue color
<Switch
  label="Enable notifications"
  defaultChecked={true}
  onChange={handleChange}
/>

// ✅ ĐÚNG: Switch với gray color
<Switch
  label="Dark mode"
  color="gray"
  onChange={handleChange}
/>
```

### DatePicker

**Location:** `src/components/form/date-picker.tsx`

**Usage:**
```tsx
// ✅ ĐÚNG: Date picker
<DatePicker
  value={date}
  onChange={setDate}
  placeholder="Select date"
/>
```

### FileInput

**Location:** `src/components/form/input/FileInput.tsx`

**Usage:**
```tsx
// ✅ ĐÚNG: File input
<FileInput
  accept="image/*"
  onChange={handleFileChange}
/>
```

### PhoneInput

**Location:** `src/components/form/group-input/PhoneInput.tsx`

**Usage:**
```tsx
// ✅ ĐÚNG: Phone input
<PhoneInput
  value={phone}
  onChange={setPhone}
/>
```

### MultiSelect

**Location:** `src/components/form/MultiSelect.tsx`

**Usage:**
```tsx
// ✅ ĐÚNG: Multi select
<MultiSelect
  options={options}
  selectedValues={selected}
  onChange={setSelected}
/>
```

### TreeSelect

**Location:** `src/components/form/TreeSelect.tsx`

**Usage:**
```tsx
// ✅ ĐÚNG: Tree select
<TreeSelect
  data={treeData}
  value={selectedValue}
  onChange={setSelectedValue}
/>
```

## Utility Classes

Utility classes được định nghĩa trong `globals.css` với `@utility` syntax (Tailwind CSS v4).

### Menu Item Utilities

#### menu-item

Base class cho menu items.

**Classes:**
- `menu-item`: `relative flex items-center w-full gap-3 px-3 py-2 font-medium rounded-lg text-theme-sm`

**Usage:**
```tsx
// ✅ ĐÚNG: Menu item
<a className="menu-item">
  Menu Item
</a>
```

#### menu-item-active

Active state cho menu items.

**Classes:**
- `menu-item-active`: `bg-brand-50 text-brand-500 dark:bg-brand-500/[0.12] dark:text-brand-400`

**Usage:**
```tsx
// ✅ ĐÚNG: Active menu item
<a className="menu-item menu-item-active">
  Active Item
</a>
```

#### menu-item-inactive

Inactive state cho menu items.

**Classes:**
- `menu-item-inactive`: `text-gray-700 hover:bg-gray-100 group-hover:text-gray-700 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-gray-300`

**Usage:**
```tsx
// ✅ ĐÚNG: Inactive menu item
<a className="menu-item menu-item-inactive">
  Inactive Item
</a>
```

#### menu-item-icon

Icon trong menu items.

**Classes:**
- `menu-item-icon`: `text-gray-500 group-hover:text-gray-700 dark:text-gray-400`

**Usage:**
```tsx
// ✅ ĐÚNG: Menu item với icon
<a className="menu-item">
  <Icon className="menu-item-icon" />
  Menu Item
</a>
```

#### menu-item-icon-active

Active icon trong menu items.

**Classes:**
- `menu-item-icon-active`: `text-brand-500 dark:text-brand-400`

**Usage:**
```tsx
// ✅ ĐÚNG: Active menu item với icon
<a className="menu-item menu-item-active">
  <Icon className="menu-item-icon-active" />
  Active Item
</a>
```

#### menu-item-arrow

Arrow icon cho expandable menu items.

**Classes:**
- `menu-item-arrow`: `relative`

**Usage:**
```tsx
// ✅ ĐÚNG: Menu item với arrow
<a className="menu-item">
  Menu Item
  <Icon className="menu-item-arrow" />
</a>
```

#### menu-item-arrow-active

Active arrow icon.

**Classes:**
- `menu-item-arrow-active`: `rotate-180 text-brand-500 dark:text-brand-400`

**Usage:**
```tsx
// ✅ ĐÚNG: Active expanded menu item
<a className="menu-item menu-item-active">
  Menu Item
  <Icon className="menu-item-arrow-active" />
</a>
```

### Menu Dropdown Utilities

#### menu-dropdown-item

Base class cho dropdown menu items.

**Classes:**
- `menu-dropdown-item`: `relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-theme-sm font-medium`

**Usage:**
```tsx
// ✅ ĐÚNG: Dropdown item
<a className="menu-dropdown-item">
  Dropdown Item
</a>
```

#### menu-dropdown-item-active

Active state cho dropdown items.

**Classes:**
- `menu-dropdown-item-active`: `bg-brand-50 text-brand-500 dark:bg-brand-500/[0.12] dark:text-brand-400`

**Usage:**
```tsx
// ✅ ĐÚNG: Active dropdown item
<a className="menu-dropdown-item menu-dropdown-item-active">
  Active Item
</a>
```

#### menu-dropdown-item-inactive

Inactive state cho dropdown items.

**Classes:**
- `menu-dropdown-item-inactive`: `text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5`

**Usage:**
```tsx
// ✅ ĐÚNG: Inactive dropdown item
<a className="menu-dropdown-item menu-dropdown-item-inactive">
  Inactive Item
</a>
```

#### menu-dropdown-badge

Badge trong dropdown items.

**Classes:**
- `menu-dropdown-badge`: `block rounded-full px-2.5 py-0.5 text-xs font-medium uppercase text-brand-500 dark:text-brand-400`

**Usage:**
```tsx
// ✅ ĐÚNG: Dropdown item với badge
<a className="menu-dropdown-item">
  Item
  <span className="menu-dropdown-badge">New</span>
</a>
```

#### menu-dropdown-badge-active

Active badge.

**Classes:**
- `menu-dropdown-badge-active`: `bg-brand-100 dark:bg-brand-500/20`

**Usage:**
```tsx
// ✅ ĐÚNG: Active dropdown item với badge
<a className="menu-dropdown-item menu-dropdown-item-active">
  Item
  <span className="menu-dropdown-badge menu-dropdown-badge-active">New</span>
</a>
```

### Scrollbar Utilities

#### no-scrollbar

Ẩn scrollbar nhưng vẫn scroll được.

**Classes:**
- `no-scrollbar`: Ẩn scrollbar trên Chrome, Safari, Opera, IE, Edge, Firefox

**Usage:**
```tsx
// ✅ ĐÚNG: Container không scrollbar
<div className="overflow-y-auto no-scrollbar">
  Scrollable content
</div>
```

#### custom-scrollbar

Custom scrollbar styling.

**Classes:**
- `custom-scrollbar`: Custom scrollbar với size 1.5, rounded, gray colors

**Usage:**
```tsx
// ✅ ĐÚNG: Container với custom scrollbar
<div className="overflow-y-auto custom-scrollbar">
  Scrollable content
</div>
```

## Third-party Library Styling

### ApexCharts

ApexCharts được customize để match design system.

**Custom Styles:**
- Legend text: `text-gray-700 dark:text-gray-400`
- Tooltip: `rounded-lg border-gray-200 p-3 shadow-theme-sm dark:border-gray-800 dark:bg-gray-900`
- Gridlines: `stroke-gray-100 dark:stroke-gray-800`
- Text colors: `text-gray-700 dark:text-gray-400`

**Usage:**
```tsx
// ✅ ĐÚNG: ApexCharts tự động apply custom styles
<Chart
  options={chartOptions}
  series={chartSeries}
  type="line"
/>
```

### FullCalendar

FullCalendar được customize với design system colors và spacing.

**Custom Styles:**
- Toolbar: Custom button styling với brand colors
- Calendar cells: Custom border và background colors
- Events: Custom event colors (success, error, primary, warning)
- Today indicator: Gray background

**Usage:**
```tsx
// ✅ ĐÚNG: FullCalendar tự động apply custom styles
<FullCalendar
  plugins={[dayGridPlugin, timeGridPlugin]}
  events={events}
/>
```

### Flatpickr

Flatpickr date picker được customize.

**Custom Styles:**
- Calendar: `rounded-xl p-5 border border-gray-200 dark:border-gray-800 shadow-theme-xl`
- Selected dates: Brand color (#465fff)
- Hover states: Gray backgrounds
- Dark mode: Full support

**Usage:**
```tsx
// ✅ ĐÚNG: Flatpickr tự động apply custom styles
<Flatpickr
  options={flatpickrOptions}
  onChange={handleDateChange}
/>
```

### Swiper

Swiper carousel được customize.

**Custom Styles:**
- Navigation buttons: Custom styling với backdrop blur
- Pagination: Custom bullet styling
- Disabled states: Opacity và background changes

**Usage:**
```tsx
// ✅ ĐÚNG: Swiper với custom classes
<Swiper
  navigation={true}
  pagination={true}
  className="carouselTwo"
>
  <SwiperSlide>Slide 1</SwiperSlide>
  <SwiperSlide>Slide 2</SwiperSlide>
</Swiper>
```

## Component Patterns

### Props Interface

Tất cả components sử dụng TypeScript interfaces:

```tsx
// ✅ ĐÚNG: Component với TypeScript interface
interface ButtonProps {
  children: ReactNode;
  size?: "sm" | "md";
  variant?: "primary" | "outline";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ ... }) => {
  // Component implementation
};
```

### Variant Pattern

Components sử dụng variant pattern cho different styles:

```tsx
// ✅ ĐÚNG: Variant pattern
const variantClasses = {
  primary: "bg-brand-500 text-white",
  outline: "bg-white text-gray-700 ring-1 ring-gray-300",
};

<button className={variantClasses[variant]}>
  Button
</button>
```

### State Pattern

Components handle different states:

```tsx
// ✅ ĐÚNG: State pattern
const getStateClasses = () => {
  if (disabled) return "opacity-50 cursor-not-allowed";
  if (error) return "border-error-500";
  if (success) return "border-success-500";
  return "border-gray-300";
};
```

### Composition Pattern

Components có thể compose với nhau:

```tsx
// ✅ ĐÚNG: Composition
<Card>
  <CardHeader>
    <h3>Title</h3>
  </CardHeader>
  <CardBody>
    <Button>Action</Button>
  </CardBody>
</Card>
```

## Best Practices

1. **Always use components**: Sử dụng existing components thay vì tạo mới
2. **Follow patterns**: Tuân theo component patterns đã có
3. **Type safety**: Luôn sử dụng TypeScript interfaces
4. **Accessibility**: Đảm bảo keyboard navigation và ARIA labels
5. **Dark mode**: Tất cả components phải hỗ trợ dark mode
6. **Responsive**: Components phải responsive với breakpoints

## Common Mistakes

```tsx
// ❌ SAI: Tạo component mới thay vì reuse
<button className="custom-button">Button</button>

// ✅ ĐÚNG: Sử dụng Button component
<Button variant="primary">Button</Button>

// ❌ SAI: Hardcode styles thay vì dùng tokens
<div style={{ backgroundColor: '#465fff' }}>Content</div>

// ✅ ĐÚNG: Sử dụng color tokens
<div className="bg-brand-500">Content</div>

// ❌ SAI: Không có dark mode support
<div className="bg-white text-gray-900">Content</div>

// ✅ ĐÚNG: Có dark mode support
<div className="bg-white dark:bg-gray-dark text-gray-900 dark:text-white/90">Content</div>
```

## Tài liệu liên quan

- [Colors](./colors.md) - Color usage trong components
- [Typography](./typography.md) - Typography trong components
- [Spacing](./spacing.md) - Spacing trong components
- [Shadows](./shadows.md) - Shadows trong components
- [Animations](./animations.md) - Animations trong components

---

← Quay lại: [README.md](./README.md)
