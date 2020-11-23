var local = {
    vendedoras: ["Ada", "Grace", "Hedy", "Sheryl"],

    ventas: [
        // tener en cuenta que Date guarda los meses del 0 (enero) al 11 (diciembre)
        { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
        { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
        { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
        { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] },
        { fecha: new Date(2019, 0, 12), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1200"] }
    ],

    precios: [
        { componente: "Monitor GPRS 3000", precio: 200 },
        { componente: "Motherboard ASUS 1500", precio: 120 },
        { componente: "Monitor ASC 543", precio: 250 },
        { componente: "Motherboard ASUS 1200", precio: 100 },
        { componente: "Motherboard MZI", precio: 30 },
        { componente: "HDD Toyiva", precio: 90 },
        { componente: "HDD Wezter Dishital", precio: 75 },
        { componente: "RAM Quinston", precio: 110 },
        { componente: "RAM Quinston Fury", precio: 230 }
    ]
};

const { vendedoras, ventas, precios } = local;


//1. Se pide desarrollar las siguientes funciones:

//precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes, que es la suma de los precios de cada componente incluido.
const precioMaquina = (componentes) => {
    let total = 0;
    componentes.forEach(element => {
        const componente = precios.find(item => item.componente === element);
        total += componente.precio;
    });
    return total;
}
console.log(`El precio total de los componentes es  $${precioMaquina(["Monitor GPRS 3000", "Motherboard ASUS 1500"])}`); // 320 


//cantidadVentasComponente(componente): recibe un componente y devuelve la cantidad de veces que fue vendido, o sea que formó parte de una máquina que se vendió. La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable ventas.
const cantidadVentasComponente = (componente) => {
    let cantidad = 0;
    ventas.forEach(venta => {
        cantidad += venta.componentes.filter(item => item === componente).length;
    });
    return cantidad;
}
console.log(`El componente se vendio ${cantidadVentasComponente("Monitor ASC 543")} veces`); // 2


//vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la vendedora que más vendió en plata en el mes. O sea no cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).
const vendedoraDelMes = (mes, anio) => {
    let mejorVendedora = "";
    let importeMejor = 0;
    const ventasMes = ventas.filter(venta => venta.fecha.getFullYear() === anio && venta.fecha.getMonth() === (mes - 1));
    vendedoras.forEach(vendedora => {
        let suma = 0;
        const ventasMesVendedora = ventasMes.filter(venta => venta.nombreVendedora === vendedora);
        ventasMesVendedora.forEach(item => {
            suma += precioMaquina(item.componentes);
        });
        if (importeMejor < suma) {
            importeMejor = suma;
            mejorVendedora = vendedora;
        }
    });
    return mejorVendedora;
}
console.log(`La vendedora que mas vendio fue ${vendedoraDelMes(1, 2019)}`); // "Ada"


//ventasMes(mes, anio): Obtener las ventas de un mes. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).
const ventasMes = (mes, anio) => {
    let importe = 0;
    let ventasMes = ventas.filter(venta => venta.fecha.getFullYear() === anio && venta.fecha.getMonth() === (mes - 1));
    ventasMes.forEach(item => {
        importe += precioMaquina(item.componentes);
    });
    return importe;
}
console.log(`Las ventas del mes fueron ${ventasMes(1, 2019)}`); // 1250


//ventasVendedora(nombre): Obtener las ventas totales realizadas por una vendedora sin límite de fecha.
const ventasVendedora = (nombre) => {
    let total = 0;
    const ventasTotales = ventas.filter(venta => venta.nombreVendedora === nombre);
    ventasTotales.forEach(item => {
        total += precioMaquina(item.componentes);
    });
    return total;
}
console.log(`Las ventas totales de la vendedora fueron $${ventasVendedora("Grace")}`); // 900


//componenteMasVendido(): Devuelve el nombre del componente que más ventas tuvo historicamente. El dato de la cantidad de ventas es el que indica la función cantidadVentasComponente
const componenteMasVendido = () => {
    let cantidad = 0;
    let masVendido = 0;
    let componente = "";
    precios.forEach(item => {
        cantidad = cantidadVentasComponente(item.componente);
        if (masVendido < cantidad) {
            masVendido = cantidad;
            componente = item.componente;
        }
    });
    return componente;
}
console.log(`El componente mas vendido fue ${componenteMasVendido()}`); // Monitor GPRS 3000


//huboVentas(mes, anio): que indica si hubo ventas en un mes determinado. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).
const huboVentas = (mes, anio) => {
    //let x = new Boolean(false);
    let ventasMes = (ventas.filter(venta => venta.fecha.getFullYear() === anio && venta.fecha.getMonth() === (mes - 1)).length !== 0) ? true : false;
    return ventasMes;
}
console.log(huboVentas(3, 2019)); // false


//2. Como se abrió una nueva sucursal en Caballito, ahora los datos de las ventas también tienen el nombre de la sucursal en la cual se realizó. Por ejemplo: { fecha: new Date(2019, 1, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: 'Centro' }. Por este cambio, se pide:

//En las ventas ya existentes, tenemos que agregar la propiedad sucursal con el valor Centro (ya que es la sucursal original).
const agregarSucursal = () => {
    ventas.forEach(item => {
        item.sucursal = "Centro";
    });
    return ventas;
}
console.table(agregarSucursal());


//Agregar al objeto principal la propiedad sucursales: ['Centro', 'Caballito']
const modificarLocal = () => {
    local.sucursales = ['Centro', 'Caballito'];
    return local;
}
console.table(modificarLocal());


//Cargar la siguiente información en el array ventas, creando sus respectivos objetos siguiendo el patrón: fecha, nombreVendedora, componentes, sucursal
const modificarVentas = () => {
    let nuevasVentas = [
        { fecha: new Date(2019, 1, 12), nombreVendedora: "Hedy", componentes: ["Monitor GPRS 3000", "HDD Toyiva"], sucursal: "Centro" },
        { fecha: new Date(2019, 1, 24), nombreVendedora: "Sheryl", componentes: ["Motherboard ASUS 1500", "HDD Wezter Dishital"], sucursal: "Caballito" },
        { fecha: new Date(2019, 1, 1), nombreVendedora: "Ada", componentes: ["Motherboard MZI", "RAM Quinston Fury"], sucursal: "Centro" },
        { fecha: new Date(2019, 1, 11), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "RAM Quinston"], sucursal: "Caballito" },
        { fecha: new Date(2019, 1, 15), nombreVendedora: "Ada", componentes: ["Motherboard ASUS 1200", "RAM Quinston Fury"], sucursal: "Centro" },
        { fecha: new Date(2019, 1, 12), nombreVendedora: "Hedy", componentes: ["Motherboard ASUS 1500", "HDD Toyiva"], sucursal: "Caballito" },
        { fecha: new Date(2019, 1, 21), nombreVendedora: "Grace", componentes: ["Motherboard MZI", "RAM Quinston"], sucursal: "Centro" },
        { fecha: new Date(2019, 1, 8), nombreVendedora: "Sheryl", componentes: ["Monitor ASC 543", "HDD Wezter Dishital"], sucursal: "Centro" },
        { fecha: new Date(2019, 1, 16), nombreVendedora: "Sheryl", componentes: ["Monitor GPRS 3000", "RAM Quinston Fury"], sucursal: "Centro" },
        { fecha: new Date(2019, 1, 27), nombreVendedora: "Hedy", componentes: ["Motherboard ASUS 1200", "HDD Toyiva"], sucursal: "Caballito" },
        { fecha: new Date(2019, 1, 22), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "HDD Wezter Dishital"], sucursal: "Centro" },
        { fecha: new Date(2019, 1, 5), nombreVendedora: "Ada", componentes: ["Motherboard ASUS 1500", "RAM Quinston"], sucursal: "Centro" },
        { fecha: new Date(2019, 1, 1), nombreVendedora: "Grace", componentes: ["Motherboard MZI", "HDD Wezter Dishital"], sucursal: "Centro" },
        { fecha: new Date(2019, 1, 7), nombreVendedora: "Sheryl", componentes: ["Monitor GPRS 3000", "RAM Quinston"], sucursal: "Caballito" },
        { fecha: new Date(2019, 1, 14), nombreVendedora: "Ada", componentes: ["Motherboard ASUS 1200", "HDD Toyiva"], sucursal: "Centro" }
    ];
    nuevasVentas.forEach(item => {
        ventas.push(item);
    });
    return ventas;
}
console.table(modificarVentas());


//Crear la función ventasSucursal(sucursal), que obtiene las ventas totales realizadas por una sucursal sin límite de fecha.
const ventasSucursal = (sucursal) => {
    let total = 0;
    const ventasTotales = ventas.filter(venta => venta.sucursal === sucursal);
    ventasTotales.forEach(item => {
        total += precioMaquina(item.componentes);
    });
    return total;
}
console.log(`Las ventas totales realizadas por la sucursal fueron: $${ventasSucursal("Centro")}`);


//Las funciones ventasSucursal y ventasVendedora tienen mucho código en común, ya que es la misma funcionalidad pero trabajando con una propiedad distinta. Entonces, ¿cómo harías para que ambas funciones reutilicen código y evitemos repetir?

const { sucursales } = local;

const ventasTotales = (criterio) => {
    let total = 0;
    let ventasTotales = [];
    if (vendedoras.includes(criterio)) {
        ventasTotales = ventas.filter(venta => venta.nombreVendedora === criterio);
    }
    if (sucursales.includes(criterio)) {
        ventasTotales = ventas.filter(venta => venta.sucursal === criterio);
    }
    ventasTotales.forEach(item => {
        total += precioMaquina(item.componentes);
    });
    return total;
}
console.log(ventasTotales("Centro"));


//Crear la función sucursalDelMes(mes, anio), que se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la sucursal que más vendió en plata en el mes. No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).
const sucursalDelMes = (mes, anio) => {
    let mejorSucursal = "";
    let importeMejor = 0;
    const ventasMes = ventas.filter(venta => venta.fecha.getFullYear() === anio && venta.fecha.getMonth() === (mes - 1));
    sucursales.forEach(sucursal => {
        let suma = 0;
        const ventasMesSucursal = ventasMes.filter(venta => venta.sucursal === sucursal);
        ventasMesSucursal.forEach(item => {
            suma += precioMaquina(item.componentes);
        });
        if (importeMejor < suma) {
            importeMejor = suma;
            mejorSucursal = sucursal;
        }
    });
    return mejorSucursal;
}
console.log(`La sucursal que más vendió en plata en el mes fue: ${sucursalDelMes(1, 2019)}`); // "Centro"


//3. Para tener una mejor muestra de como está resultando el local, queremos desarrollar un reporte que nos muestre las ventas por sucursal y por mes. Para esto, necesitamos crear las siguientes funciones:

//renderPorMes(): Muestra una lista ordenada del importe total vendido por cada mes/año
const renderPorMes = () => {
    let total = 0;
    let ventasPorMes = [];
    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    for (i = 1; i <= 12; i++) {
        const ventasTotalesMes = ventas.filter(venta => venta.fecha.getMonth() === (i - 1));
        ventasTotalesMes.forEach(item => {
            total += precioMaquina(item.componentes);
        });
        ventasPorMes.push({ mes: meses[i - 1], valor: total });
        total = 0;
    }
    return ventasPorMes;
}
console.table(renderPorMes());


//renderPorSucursal(): Muestra una lista del importe total vendido por cada sucursal
const renderPorSucursal = () => {
    let ventasPorSucursal = [];
    sucursales.forEach(item => {
        ventasPorSucursal.push({ sucursal: item, valor: ventasSucursal(item) });
    });
    return ventasPorSucursal;
}
console.table(renderPorSucursal());


//render(): Tiene que mostrar la unión de los dos reportes anteriores, cual fue el producto más vendido y la vendedora que más ingresos generó
const mejorVendedora = () => {
    let mejorVendedora = "";
    let importeMejor = 0;
    vendedoras.forEach(vendedora => {
        let suma = 0;
        const ventasMesVendedora = ventas.filter(venta => venta.nombreVendedora === vendedora);
        ventasMesVendedora.forEach(item => {
            suma += precioMaquina(item.componentes);
        });
        if (importeMejor < suma) {
            importeMejor = suma;
            mejorVendedora = vendedora;
        }
    });
    return mejorVendedora;
}
const render = () => {
    let reporte = [];
    reporte.reportePorMes = renderPorMes();
    reporte.reportePorSucursal = renderPorSucursal();
    reporte.productoMasVendido = componenteMasVendido();
    reporte.mejorVendedora = mejorVendedora();
    return reporte;
}
console.log(render());