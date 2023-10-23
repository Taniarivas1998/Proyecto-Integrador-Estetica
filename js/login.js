const usuariosInicio=[
    {
        fullname: 'Rivas Tania',
        email: 'admin@admin.com',
        password: 'admin',
        role: "Administrador",
        fechaDeNacimiento:"24-02-1998",
        provincia:" Tucumán",
        id:'680244b7-59b4-47f5-9885-479cd9f298fc',
    },
    {
        fullname: 'Lujan Aguera',
        email:'lujan@gmail.com',
        password: 'alfabeta',
        fechaDeNacimiento:"14-03-1999",
        role: "Usuario",
        provincia:"Santa Fe",
        id:'d6f73559-cfad-410b-871c-f547bb9094c5',
    },
    {
        fullname: 'Mazza Gonzalo',
        email: 'gonzzalo4@gmail.com ',
        password: 'alfabeta',
        fechaDeNacimiento:"24-04-1996",
        role: "Usuario",
        provincia:"Buenos Aires",
        id:'ae65efe6-d4f7-4f05-86ad-a353977462ce',
    },
    {
        fullname: 'Rivas Lucas',
        email: 'rivasl6@gmail.com ',
        password: 'alfabeta',
        fechaDeNacimiento:"11-09-2001",
        role: "Usuario",
        provincia:"Santa Cruz",
        id:'ebf3d6e1-1ef0-4d6c-870d-0bc5125f3ae4',
    },
    {
        id:'eb7b3e44-12b7-4340-a8e5-3ddbc32924e7',
        fullname:'Nestor Rivas',
        email:'nestorrs@gmail.com',
        provincia:"Catamarca",
        password:"alfabeta",
        role:'Usuario',
        fechaDeNacimiento:'04-01-1989' ,
    },
    {
        id:'d127591c-0d9b-4231-b7e9-98a1b5ee26e7',
        fullname:'Claudia lazarte',
        email:'lazarteclau@gmail.com',
        password:"alfabeta",
        provincia:"Jujuy",
        role:'Usuario',
        fechaDeNacimiento:'19-12-1989',
    },
]
const user =JSON.parse(localStorage.getItem("usuarios"))|| usuariosInicio
if( JSON.parse(localStorage.getItem("usuarios")) === null){
    localStorage.setItem("usuarios",JSON.stringify(usuariosInicio))
}

const users = JSON.parse(localStorage.getItem("usuarios"))
const userregister = JSON.parse(localStorage.getItem("usuarioregister"))||usuariosInicio
if(JSON.parse(localStorage.getItem("usuariosregister"))===null){
    localStorage.setItem("usuarioregister", JSON.stringify(userregister))
}

const loginForm = document.getElementById("login")
    loginForm.addEventListener("submit",(event) => {

        event.preventDefault()
        
        const emailInput = event.target.elements.email.value;
        const passwordInput = event.target.elements.password.value;
       
    
        const userExist = users.find(usr => {
    
            if(usr.email === emailInput) {
                return true
            }
    
            return false;
        })
    
        if(!userExist || userExist.password !== passwordInput) {
        
            Swal.fire("Login incorrecto", "Los datos ingresados son incorrectos", "error");
            return;
        }
        
        Swal.fire("Login Correcto", "En breve será redireccionado", "success")
    
        delete userExist.password
    
        localStorage.setItem( "currentUser", JSON.stringify(userExist)   )
    
        setTimeout(function() {
            window.location.href = '/index.html'
        }, 1500)
    
    })
    function logout() {
        localStorage.removeItem("currentUser");
        setTimeout(function () {
            window.location.href = "/index.html";
        }, 1500);
    }

