const fs = require('fs');
const path = require('path');
const descriptions = require('./description')
const category = require('./category')

const product = {

    all: ()=>{
        const directory = path.resolve(__dirname, '../data','products.json')
        const readJsonn = fs.readFileSync(directory,{encoding:'utf-8'});
        const products = JSON.parse(readJsonn);
        return products;
    },

    addOnlyDescription: ()=> {
        const productos = product.all();
        const productDescription = productos.map(producto =>{
            producto.description =  producto.description.map(oneDescription => {
                oneDescription = descriptions.one(oneDescription).description
                return oneDescription;
                
        })

        return producto;
        
    } )
    return productDescription;
    
},

    addOnlyCategory: ()=> {
        const productos = product.all();
        const productCategory = productos.map(producto =>{
            producto.category = category.one(producto.category) 
            return producto
    } )

    return productCategory;
    
    },

    addAll: ()=> {
        const productos = product.all();
       

        return product.all().map(producto =>{
            producto.category = category.one(producto.category) 
            return producto

    }).map(product =>{
        product.privileges = product.privileges.map(privilege => {
            return descriptions.one(privilege)
        })
        return product
    })  

    },

    one:(id) => {
        let all = product.addAll();
        return all.find(p => p.id == id)
    },

    create: (data,file) => {
        const directory = path.resolve(__dirname, '../data','products.json')
        let all = product.all();
        let categorySelect = category.one(data.category)
        let newPrivilege = descriptions.create(data.privilege)
        categorySelect.privileges.push(newPrivilege);

        let newProduct = {
            id: all.length > 0 ? all[all.length -1].id + 1 : 2,
            name: data.name,
            privileges: categorySelect.privileges,
            image: file.filename,
            min: data.min,
            max: data.max,
            category: categorySelect.id,
            range: data.range
        };
        all.push(newProduct);
        fs.writeFileSync(directory,JSON.stringify(all,null,2));
        return true
    },

    one: (id)=> {
        let all= product.all();
        let findElement = all.find(element => element.id == id)
        return findElement;
    },

    edit: function (data,file,id){
        const directory = path.resolve(__dirname,"../data", "products.json");
        let productos = product.all();
        productos.map(product => {
            if(product.id == id) {
                product.name = data.name,
                product.privileges = data.privileges,
                product.category = data.category,
                product.image = file.filename,
                product.min = data.min, 
                product.max = data.max,
                product.range = data.range

                return product;

            }
            return product;
        })
        fs.writeFileSync(directory,JSON.stringify(productos,null,2));
        return true
    }



}






module.exports = product;