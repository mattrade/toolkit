# Accordion #

Allows collapsing and expanding of multiple sections of content.

## Usage ##

An accordion must be structured using an unordered or ordered list.
Every item in the list should have an accompanying header and section.
The header will be bound with a click event that toggles the display of its sibling section,
while also closing other sections (can be changed through options).
The markup within each item can be customized to an extent,
but will require configuration when the JavaScript is initialized.

```html
<ul class="accordion">
    <li>
        <header class="accordion-header">
            Section Header
        </header>
        <section class="accordion-section">
            <div class="accordion-body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Quisque ipsum sem, faucibus a consectetur vel, dictum ut sapien.
                Suspendisse at odio ut risus sagittis viverra et vitae tortor.
                Fusce id aliquam enim, ac blandit dolor. Vivamus porta convallis vestibulum.
                Suspendisse pretium, dolor quis semper ultricies, magna felis aliquam nisl,
                at semper mauris sem non purus. Vivamus a felis nibh. Praesent nec elementum nulla,
                quis egestas nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra.
            </div>
        </section>
    </li>
</ul>
```

<div class="notice is-warning">
    <h5>Animation Requirement</h5>

    The <code>.accordion-section</code> class is required for slide animations.
    Applying padding to this element will break the slide logic, so style <code>.accordion-body</code> instead.
</div>

Once the markup is in place, an accordion can be initialized.

```javascript
$('.accordion').accordion();
```

## Notes ##

* The `.accordion-header` will be clickable, no need for anchor tags
* The `.show` and `.hide` classes will be toggled on the `.accordion-section` to trigger slide animations
* The currently open section will have an `.is-active` class on the parent `li`

## Options ##

<table class="table data-table">
    <thead>
        <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>mode</td>
            <td>string</td>
            <td>click</td>
            <td>
                The type of interaction for toggling a section.
                Accepts click or hover.
            </td>
        </tr>
        <tr>
            <td>defaultIndex</td>
            <td>int</td>
            <td>0</td>
            <td>The index of the section to open on page load.</td>
        </tr>
        <tr>
            <td>multiple</td>
            <td>bool</td>
            <td>false</td>
            <td>Allows multiple sections to be open simultaneously. Will override the <code>collapsible</code> option.</td>
        </tr>
        <tr>
            <td>collapsible</td>
            <td>bool</td>
            <td>false</td>
            <td>Allows the open section to be closed, without having to open another section.</td>
        </tr>
        <tr>
            <td>headerElement</td>
            <td>string</td>
            <td>.accordion-header</td>
            <td>CSS selector to find all header elements within the accordion.</td>
        </tr>
        <tr>
            <td>sectionElement</td>
            <td>string</td>
            <td>.accordion-section</td>
            <td>CSS selector to find all section elements within the accordion.</td>
        </tr>
    </tbody>
</table>

## Events ##

Inherits all events from the [parent component](../development/js.md#events).

<table class="table data-table">
    <thead>
        <tr>
            <th>Option Event</th>
            <th>Element Event</td>
            <th>Arguments</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>onJump</td>
            <td>jump.toolkit.accordion</td>
            <td>int:index</td>
            <td>Triggered when a section is opened manually through the <code>jump()</code> method.</td>
        </tr>
    </tbody>
</table>

## Properties ##

Inherits all properties from the [parent component](../development/js.md#properties).

<table class="table data-table">
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>node</td>
            <td>element</td>
            <td>The header element of the currently open section. Is automatically set through click events.</td>
        </tr>
        <tr>
            <td>headers</td>
            <td>collection</td>
            <td>
                A collection of header elements within the accordion.
                These elements are found using the <code>headerElement</code> option.
            </td>
        </tr>
        <tr>
            <td>sections</td>
            <td>collection</td>
            <td>
                A collection of section elements within the accordion.
                These elements are found using the <code>sectionElement</code> option.
            </td>
        </tr>
        <tr>
            <td>previousIndex</td>
            <td>int</td>
            <td>The index of the previously opened section.</td>
        </tr>
        <tr>
            <td>currentIndex</td>
            <td>int</td>
            <td>The index of the currently opened section.</td>
        </tr>
    </tbody>
</table>

## Methods ##

Inherits all methods from the [parent component](../development/js.md#methods).

<table class="table data-table">
    <thead>
        <tr>
            <th>Method</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>jump(int:index)</td>
            <td>
                Open a specific section using the index in the collection.
                If the index is out of range, it will be bounded.
            </td>
        </tr>
        <tr>
            <td>show(element:node)</td>
            <td>
                Open a specific section using the sibling header.
                This method is triggered automatically through click events.
            </td>
        </tr>
    </tbody>
</table>