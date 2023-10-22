const usuariosInicio = [
    {
        fullname: 'Rivas Tania',
        email: 'admin@admin.com',
        password: 'admin',
        role: "ROLE_ADMIN",
        id:'680244b7-59b4-47f5-9885-479cd9f298fc ',
    },
    {
        fullname: 'Lujan Aguera',
        email:'lujan@gmail.com',
        password: 'alfabeta',
        role: "ROLE_CLIENT",
        id: 'd6f73559-cfad-410b-871c-f547bb9094c5 ',
    },
    {
        fullname: 'Mazza Gonzalo',
        email: 'gonzzalo4@gmail.com ',
        id: 'ae65efe6-d4f7-4f05-86ad-a353977462ce  ',
        password: 'alfabeta',
        role: "ROLE_CLIENT"
    },
    {
        fullname: 'Rivas Lucas',
        email: 'rivasl6@gmail.com ',
        id: 'ebf3d6e1-1ef0-4d6c-870d-0bc5125f3ae4 ',
        password: 'alfabeta',
        role: "ROLE_CLIENT"
    },
]
 
if( localStorage.getItem("usuarios") === null  ) {

    localStorage.setItem("usuarios", JSON.stringify(usuariosInicio))

}

const users = JSON.parse(localStorage.getItem("usuarios"))


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
            window.location.href = "../index.html";
        }, 1500);
    }
    
