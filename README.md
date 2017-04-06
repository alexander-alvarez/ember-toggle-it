# ember-toggle-it

Sick of having CSS classes sprinkled everywhere just to rotate an icon?
Wish it could be more declarative to implement?
`ember-toggle-it` will help you easily toggle it.

## Installation

`ember install ember-toggle-it`

## Usage

**Supports Several Toggle Modes**

Up-Down
```hbs
{{#toggle-it toggleMode='^-v' value=value as |t| }}
   <a onclick={{action t.toggle}}>Icon </a>
{{/toggle-it}}
```

Left-Right (will be inverted in rtl mode)
```hbs
{{#toggle-it toggleMode='<->' value=value as |t| }}
   <a onclick={{action t.toggle}}>Icon </a>
{{/toggle-it}}
```

Left-Down (will be right-down in rtl-mode)
```hbs
{{#toggle-it toggleMode='<-v' value=value as |t| }}
   <a onclick={{action t.toggle}}>Icon </a>
{{/toggle-it}}
```

**Supports DDAU**

```hbs
{{#toggle-it value=value update=(action (mut value)) as |t|}}
   <a onclick={{action t.toggle}}>Icon </a>
{{/toggle-it}}
```

**Supports RTL**

```hbs
{{#toggle-it rtl=true value=value as |t| }}
   <a onclick={{action t.toggle}}>Icon </a>
{{/toggle-it}}
```

**Supports clean DOM mode**

```hbs
{{#toggle-it tagName='' value=value as |t| }}
   <a class="{{t.classes}}" onclick={{action t.toggle}}>Icon </a>
{{/toggle-it}}
```

## Contributing 

* `git clone alexander-alvarez/ember-toggle-it` this repository
* `cd ember-toggle-it`
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
