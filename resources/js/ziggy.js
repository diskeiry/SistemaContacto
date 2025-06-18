// Este archivo se genera automáticamente con php artisan ziggy:generate
// Pero puedes crear una versión básica manualmente:

const Ziggy = {
  url: "http://localhost:8000",
  port: null,
  defaults: {},
  routes: {
    login: { uri: "login", methods: ["GET", "HEAD"] },
    logout: { uri: "logout", methods: ["POST"] },
    dashboard: { uri: "dashboard", methods: ["GET", "HEAD"] },
    "contactos.index": { uri: "contactos", methods: ["GET", "HEAD"] },
    "contactos.create": { uri: "contactos/create", methods: ["GET", "HEAD"] },
    "contactos.store": { uri: "contactos", methods: ["POST"] },
    "contactos.show": { uri: "contactos/{contacto}", methods: ["GET", "HEAD"] },
    "contactos.edit": { uri: "contactos/{contacto}/edit", methods: ["GET", "HEAD"] },
    "contactos.update": { uri: "contactos/{contacto}", methods: ["PUT", "PATCH"] },
    "contactos.destroy": { uri: "contactos/{contacto}", methods: ["DELETE"] },
    "reportes.index": { uri: "reportes", methods: ["GET", "HEAD"] },
    "reportes.exportar-csv": { uri: "reportes/exportar-csv", methods: ["GET", "HEAD"] },
    "password.request": { uri: "forgot-password", methods: ["GET", "HEAD"] },
  },
}

if (typeof window !== "undefined" && typeof window.Ziggy !== "undefined") {
  Object.assign(Ziggy.routes, window.Ziggy.routes)
}

export { Ziggy }

// Función route helper
export function route(name, params, absolute) {
  const route = Ziggy.routes[name]
  if (!route) {
    throw new Error(`Route [${name}] not found`)
  }

  let url = route.uri

  if (params) {
    if (typeof params === "object") {
      Object.keys(params).forEach((key) => {
        url = url.replace(`{${key}}`, params[key])
      })
    } else {
      // Si params es un valor simple, reemplazar el primer parámetro
      url = url.replace(/\{[^}]+\}/, params)
    }
  }

  return absolute ? `${Ziggy.url}/${url}` : `/${url}`
}

// Hacer route disponible globalmente
if (typeof window !== "undefined") {
  window.route = route
}
