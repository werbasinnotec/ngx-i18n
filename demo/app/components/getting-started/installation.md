# Innotec Auth Plugin

The Innotec-Auth-Plugin is designed to handle all authentication processes for applications where's conntected to the innotec v2 infrastructure. Theses plugin provides different authentication processes:

- Authentication over authentication providers (Github, PayPal, Facebook ...)
- Authentication over the Innotec V2 Infrastructure (Authentication by username and password)

With this module its easy to connect the infrastructure.

### Installation

**NOTE**: please use `npm 3.*` (`(sudo) npm i -g npm@3`)

```bash
npm i --save --save-exact innotec-auth-plugin
```

### Import in your app module

You can import the module in your Application with:

```javascript
import { InnotecAuthPlugin } from 'innotec-auth-plugin';
```
