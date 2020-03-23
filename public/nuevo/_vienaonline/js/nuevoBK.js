$(document).ready(function(){

    /*ALERTA COOKIES***************************************************************************************************/

    //Mostrar alerta cookie
    if (!Cookies('alerta_cookies')){
        setTimeout(function(){ $('.cookies').fadeIn(500); }, 1000);
    }

    //Set cookie y cerrar alerta
    $(".cerrar_cookies").click(function(){
        Cookies.set('alerta_cookies', 1, { expires: 365 });
        $('.cookies').fadeOut(200);
    });

    //Subir
    $(window).scroll(function () {
        if ($(window).scrollTop() > 180) {
            $('.subir').fadeIn(100);
        } else {
            $('.subir').fadeOut(100);
        }
    });

    $('.subir').click(function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, 300);
        setTimeout(function(){ scrollAllow = true; }, 1000);
        return false;
    });

    //Promociones
    /*$(window).scroll(function () {
        var offset = $('.iconos_home').position().top - $('.promociones').height() - 400;
        if ($('.promociones').length){
            if ($(window).scrollTop() <= 150){
                $('.promociones').css({'top': '6rem'});
            }
            else if ($(window).scrollTop() > 150 && $(window).scrollTop() < offset) {
                $('.promociones').css({'top': $(window).scrollTop()});
            } else {
                $('.promociones').css({'top': offset});
            }
        }
    });*/

    //Buscador
    $(".buscar").click(function(){
        //Vacío buscador y sugerencias
        $("#buscador").val("");
        rellenar_sugerencias($("#buscador").val(),$(".sugerencias_busqueda"));
        $('html, body').animate({scrollTop: 0}, 0);
        if ($(".buscador").css('display') === 'none'){
            $(".buscador").fadeIn(500);
            $("#buscador").focus();
            $('.acceso').hide();
            $('.menu_movil').hide();
            if ($('.slider').length && $(this).width() > 766){
                $('.slider').hide();
            }
            if ($('.promociones_home').length && $(this).width() < 767){
                $('.promociones_home').css({'margin-top':'2rem'});
            }
        }
        else{
            $(".buscador").fadeOut(500);
            if ($('.slider').length && $(this).width() > 766){
                $('.slider').show();
            }
            if ($('.promociones_home').length && $(this).width() < 767){
                $('.promociones_home').css({'margin-top':'10rem'});
            }
        }
    });

    //Para que no haga submit on enter
    $('#form_buscar').on('keyup keypress', function(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            e.preventDefault();
            return false;
        }
    });

    //Acceso
    $(".acceder").click(function(){
        $('html, body').animate({scrollTop: 0}, 0);
        if ($(".acceso").css('display') === 'none'){
            $(".acceso").fadeIn(500);
            $(".usuario").focus();
            $('.buscador').hide();
            $('.menu_movil').hide();
            if ($('.slider').length && $(this).width() > 766){
                $('.slider').hide();
            }
        }
        else{
            $(".acceso").fadeOut(500);
            if ($('.slider').length && $(this).width() > 766){
                $('.slider').show();
            }
        }
    });

    //Botón menú móvil
    $(".boton_menu").click(function(){
        $('html, body').animate({scrollTop: 0}, 0);
        if ($(".menu_movil").css('display') === 'none'){
            $(".menu_movil").fadeIn(500);
            $('.acceso').hide();
            $('.buscador').hide();
        }
        else{
            $(".menu_movil").fadeOut(500);
        }
    });

    //Recordar
    $(".recordar").click(function(){
        $("#recordar").val(1);
        document.form_acceso.submit();
    });

    //Para que SIEMPRE muestre el menú a partir de 767px aunque haga resize
    $(window).resize(function() {
        if ($(this).width() > 767) {
            $('.navbar-nav').css({'display':'inline-block'});
        }
        else if ($('.navbar-nav').css('display') === 'inline-block'){
            $('.navbar-nav').css({'display':'none'});
        }
    });

    function redimensionarMascara(){
        var ancho = window.innerWidth ? window.innerWidth : $(window).width();
        var alto = $(document).height();
        ancho = (ancho>1920) ? 1920 : ancho;
        $(".mascara").css({'height': alto, 'width': ancho});
    }

    //Al entrar
    redimensionarMascara();

    //Tamaños on resize
    $(window).resize(function() {
        redimensionarCabecera();
        redimensionarMascara();
    });

    //Nav más pequeño on scroll
    $(document).on("scroll",function(){
        redimensionarCabecera();
    });

    function redimensionarCabecera(){
        var ancho = window.innerWidth ? window.innerWidth : $(window).width();
        if($(document).scrollTop()>30 && $(window).width() > 767){
            $(".triangulo img").css({'width': '3rem', 'opacity': '0'});
            $(".logo img").css({'width': '12rem', 'margin': '2rem 0'});
            $("nav .iconos").css({'margin': '3.5rem 0 0 0'});
        } else{
            $(".triangulo img").css({'width': getAnchoTriangulo(ancho), 'opacity': '1'});
            $(".logo img").css({'width': getAnchoLogo(ancho), 'margin': getMargenLogo(ancho)});
            $("nav .iconos").css({'margin': getMargenIconos(ancho)});
        }
    }

    function getAnchoTriangulo(ancho){

        if (ancho > 1600){
            return '15rem';
        }
        else if (ancho > 1200){
            return '13rem';
        }
        else if (ancho > 1024){
            return '11rem';
        }
        else{
            return '9rem';
        }

    }

    function getAnchoLogo(ancho){

        if (ancho > 1600){
            return '23rem';
        }
        else if (ancho > 1200){
            return '20rem';
        }
        else if (ancho > 1024){
            return '18rem';
        }
        else if (ancho > 767){
            return '16rem';
        }
        else{
            return '8rem';
        }

    }

    function getMargenLogo(ancho){

        if (ancho > 767){
            return '4rem 0';
        }
        else{
            return '1rem 0';
        }

    }

    function getMargenIconos(ancho){

        if (ancho > 767){
            return '2rem 0 0 0';
        }
        else{
            return '1rem 0';
        }

    }

    //Slider
    $('#lightSlider').lightSlider({
        item: 1,
        loop: true,
        slideMove: 1,
        speed: 2000,
        pause: 5000,
        auto: 'true',
        mode: 'fade',
        keyPress: false,
        enableDrag: false,
        pager: false,
        prevHtml:'<img src="/img/nuevo/left_arrow.svg">',
        nextHtml:'<img src="/img/nuevo/right_arrow.svg">'
    });

    //Promociones home
    $('#lightGallery').lightSlider({
        item:3,
        loop:true,
        slideMove:1,
        auto: 'true',
        easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
        speed: 1000,
        pause: 3000,
        pager: false,
        keyPress: true,
        enableDrag: false,
        prevHtml:'<img src="/img/nuevo/left_arrow_2.svg">',
        nextHtml:'<img src="/img/nuevo/right_arrow_2.svg">',
        responsive : [
            {
                breakpoint:768,
                settings: {
                    item:1,
                    enableDrag: true,
                }
            },
        ]
    });

    //Promociones home
    $('#lightGalleryLateral').lightSlider({
        item:3,
        loop:true,
        slideMove:1,
        auto: 'true',
        easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
        speed: 1000,
        pause: 3000,
        pager: false,
        keyPress: true,
        enableDrag: false,
        vertical:true,
        verticalHeight:1220,
        responsive : [
            {
                breakpoint:1440,
                settings: {
                    verticalHeight:1015,
                }
            },
        ]
    });

    //Ocultar clave
    /*
    var clave = "";
    var encriptada = "";
    var input = "";
    $('.clave').keyup(function(e){
        if (e.key !== 'Enter' && e.key !== 'Tab'){
            input = $(".clave").val();
            if (e.key !== 'Backspace'){
                clave += e.key;
                encriptada = input.replace(e.key,"*");
            }
            else{
                clave = clave.slice(0, -1);
                encriptada = encriptada.slice(0, -1);
            }
            $(".clave").val(encriptada);
            $("#clave").val(clave);
            (clave!=="") ? $(".borrar_clave").show() : $(".borrar_clave").hide();
        }
        else if (e.key === 'Enter'){
            //Submit form
            form_acceso.submit();
        }
    });
    */

    //Acceder con enter
    $('.clave').keyup(function(e){
        if (e.key === 'Enter') {
            //Submit form
            form_acceso.submit();
        }
    });

    //Recordar clave
    $(".recordar").click(function() {
        $(".recordar").val("recordar");
        form_acceso.submit();
    });

    //Ocultar claves en recordar, cambiar y registrarse
    /*
    var clave1 = "";
    var encriptada1 = "";
    var input1 = "";
    $('.clave1').keyup(function(e){
        if (e.key !== 'Enter' && e.key !== 'Tab'){
            input1 = $(".clave1").val();
            if (e.key !== 'Backspace'){
                clave1 += e.key;
                encriptada1 = input1.replace(e.key,"*");
            }
            else{
                clave1 = clave1.slice(0, -1);
                encriptada1 = encriptada1.slice(0, -1);
            }
            $(".clave1").val(encriptada1);
            $("#clave1").val(clave1);
            (clave1!=="") ? $(".borrar_clave1").show() : $(".borrar_clave1").hide();
            $(".errores_form").html("");

        }
    });

    var clave2 = "";
    var encriptada2 = "";
    var input2 = "";
    $('.clave2').keyup(function(e){
        if (e.key !== 'Enter' && e.key !== 'Tab'){
            input2 = $(".clave2").val();
            if (e.key !== 'Backspace'){
                clave2 += e.key;
                encriptada2 = input2.replace(e.key,"*");
            }
            else{
                clave2 = clave2.slice(0, -1);
                encriptada2 = encriptada2.slice(0, -1);
            }
            $(".clave2").val(encriptada2);
            $("#clave2").val(clave2);
            (clave2!=="") ? $(".borrar_clave2").show() : $(".borrar_clave2").hide();
            $(".errores_form").html("");
        }
    });
    */

    //Enviar restablecer
    $(".enviar_restablecer").click(function() {
        var mensaje = checkPassword($("#clave1").val(),$("#clave2").val());
        (mensaje) ? $(".errores_form").html(mensaje) : form_restablecer.submit();
    });
    /*
    $(".borrar_clave").click(function() {
        var id = $(this).attr('data-id');
        $("#"+id).val("");
        $("."+id).val("");
        $(this).hide();
    });
    */
    function checkPassword(clave1,clave2){

        if (clave1.length < 8){
            return "La contraseña debe tener al menos 8 caracteres";
        }
        if (clave1.length > 16){
            return "La contraseña no puede tener más de 16 caracteres";
        }
        if (clave1 !== clave2){
            return "Las contraseñas no coinciden";
        }
        if (clave1 === clave2){
            return 0;
        }

    }

    //Rellenar sugerencias de productos o familias
    $("#buscador").keyup(function() {
        rellenar_sugerencias($("#buscador").val(),$(".sugerencias_busqueda"));
    });

    function rellenar_sugerencias(texto,sugerencias){

        $.ajax({
            url: '/sugerirbusqueda?texto='+texto,
            type: 'GET',
            success: function (data) {
                //Recorro y muestro las coincidencias (hasta 24)
                var items = "";
                for (var i = 0; i < data.length; i++) {
                    var item = "<div class='col-xs-4 item'>"
                    item += "<a href='" + data[i].enlace + "' title='" + data[i].nombre + "'>";
                    item += "<img src='" + data[i].foto + "' alt='" + data[i].nombre + "'><br>";
                    item += "<h2>" + data[i].nombre + "</h2>";
                    item += "</a></div>";
                    items += item;
                }
                sugerencias.html(items);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
            }
        });

    }

    //Opacity on hover item
    $(".cont_img").hover(
        function() { $(this).find('img').removeClass('opacity_out').addClass('opacity_in');},
        function() { $(this).find('img').removeClass('opacity_in').addClass('opacity_out');}
    );

    //Cambiar cantidad con el select de la cesta
    $(".select_cantidad").change(function() {
        var id = $(this).attr('data-id');
        $("#cantidad-"+id).val(this.value);
        //Si estoy en la cesta, click en su actualizar
        if ($( "#actualizar-"+id).length){
            //$( "#actualizar-"+id).show( );
            $( "#actualizar-"+id).trigger( "click" );
        }
    });

    //Cambiar producto formato
    $(".producto_formato").click(function() {

        var slug = $(this).attr('data-slug');
        var detalle = $(this).attr('data-detalle');
        //Cambio imágenes
        $(".img-"+slug).hide();
        $("#img-"+detalle).show();
        //Cambio radio
        $(".radio-"+slug).css({'background-color':'transparent', 'border': '1px solid #ccc'});
        $("#radio-"+detalle).css({'background-color':'rgb(126,34,49)','border': '1px solid rgb(126,34,49)'});
        //Cambio precio
        $(".precio-"+slug).hide();
        $("#precio-"+detalle).show();
        //Cambio slug hidden
        $("#slug-"+slug).val(detalle);
        if ($(".peso").length){
            $(".peso-"+slug).hide();
            $("#peso-"+detalle).show();
        }

    });

    //Mostrar observaciones producto (y ocultar descripción)
    $(".mostrar_obs").hover(
        function() {
            if ($(".obs-"+$(this).attr('data-id')).length){
                $(".desc-"+$(this).attr('data-id')).addClass('oculta');
                $(".obs-"+$(this).attr('data-id')).removeClass('oculta');
            }
        },
        function() {
            if ($(".obs-"+$(this).attr('data-id')).length) {
                $(".obs-" + $(this).attr('data-id')).addClass('oculta');
                $(".desc-" + $(this).attr('data-id')).removeClass('oculta');
            }
        }
    );

    //Mostrar alergeno
    $(".mostrar_alergeno").click(function() {

        $(".alergeno").slideToggle(500);
        $(this).toggleClass('girar');

    });

    //Añadir a la cesta
    $(".add_cesta").click(function() {

        var url_cesta = 'https://' + window.location.hostname + "/cesta/cestanueva";
        var id = $(this).attr('data-id');
        var accion = $(this).attr('data-accion');
        var slug = $("#slug-"+id).val();
        var modificar = $("#modificar-"+id).val();
        //Para que ponga 1 si no ha metido ninguna
        var cantidad = ($("#cantidad-"+id).val()) ? $("#cantidad-"+id).val() : 1;
        //Para que ponga 0 si viene de la cesta
        var cantidad = (accion==="borrar") ? 0 : cantidad;

        $.ajax({
            type: "POST",
            url: url_cesta,
            data: {
                'slug': slug,
                'cantidad': cantidad,
                'modificar': modificar,
            },
            dataType: "html",
            success: function(datos) {
                actualizarCesta(datos);
                if (modificar==="1"){
                    setTimeout(function() {
                        window.location.reload();
                    }, 500);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
            }
        })
    });

    //Actualizar cesta al entrar a la página ¿mensaje?
    actualizarCesta("");

    //Actualizar cesta flotante
    function actualizarCesta(datos){

        //Actualizo la cesta
        $.ajax({
            type: "GET",
            url: 'https://' + window.location.hostname + "/cesta/datoscesta",
            dataType: "html",
            success: function(datos) {
                //Dibujo la cesta
                $(".cont_cesta").html(datos);
                //Check vacia
                check_vacia(datos);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
            }
        })

        //Si viene de modificar la cesta
        if (datos){
            var datos = JSON.parse(datos);
            var mensaje = datos.mensaje;
            var tipo = datos.tipo;
            var reparto = datos.reparto;
            var mensaje_reparto = "<br>La zona actual de reparto es la Comunidad de Madrid,<br>para otras direcciones de envío por favor <a href='/paginas/contacto'><rojo_strong>contacta</rojo_strong></a> con nosotros.";
            //Actualizo la cantidad
            (datos.cantidad_cesta > 0) ? $(".cantidad_cesta ").html(datos.cantidad_cesta) : $(".cantidad_cesta").html("");

            //Mensaje
            (reparto === 1) ? $(".alerta_add_cesta span").html(mensaje+mensaje_reparto) : $(".alerta_add_cesta span").html(mensaje);
            //Tipo
            (tipo === "error") ? $(".alerta_add_cesta").addClass("error_cesta") : $(".alerta_add_cesta").removeClass("error_cesta");
            //Muestro la alerta y giro la cesta
            $(".alerta_add_cesta").fadeIn(500);
            $(".abrir_cesta img").addClass('efecto_cesta');
            setTimeout(function() {
                $(".alerta_add_cesta").fadeOut();
                $(".abrir_cesta img").removeClass('efecto_cesta');
            }, 10000);
        }

    }

    function check_vacia(datos){
        //Si la cesta está vacía
        if (datos===""){
            $(".cont_cesta").html("La cesta está vacía");
            $(".cesta .ir_cesta").hide();
        }
        else{
            $(".cesta .ir_cesta").show();
        }
    }

    //Mostrar cesta
    $(".abrir_cesta").click(function(){
        if ($(".cesta").css('display') === 'none'){
            $(".cesta").fadeIn(500);
            $('.acceso').hide();
            $('.buscador').hide();
        }
        else{
            $(".cesta").fadeOut(500);
        }
    });
    $(".abrir_cesta2").click(function(){
        if ($(".cesta").css('display') === 'none'){
            $(".cesta").fadeIn(500);
            $('.acceso').hide();
            $('.buscador').hide();
        }
        else{
            $(".cesta").fadeOut(500);
        }
    });

    //Cerrar cesta
    $(".cerrar_cesta").click(function(){
        $(".cesta").fadeOut(500);
    });

    //Cerrar alerta
    $(".autocierre").click(function(){
        $(this).fadeOut(500);
        $(".abrir_cesta img").removeClass('efecto_cesta');
    });
    $(".cerrar_alerta").click(function(){
        $(".autocierre").fadeOut(500);
        $(".abrir_cesta img").removeClass('efecto_cesta');
    });

    //COnfirmar vaciar
    $(".vaciar_cesta").click(function() {
        $(".confirmar_vaciar").slideToggle(500);
    });

    //Mostrar actualizar
    $(".input_cantidad").focus(function() {
        var id = $(this).attr('data-id');
        $("#actualizar-"+id).fadeIn(500)
    });

    //Abrir acceso si hay mensaje
    if ($(".alerta_warning").length){
        var html = $(".alerta_warning").html();
        if (html.search("revisa los datos") > 0 || html.search("No hay") > 0){
            $('html, body').animate({scrollTop: 0}, 0);
            $(".acceso").fadeIn(500);
            $(".usuario").focus();
        }
    }

    //Form datos cliente
    var errores_datos = 0;

    //Errores form datos cliente
    $(".comprobar").focusout(function() {
        var id = $(this).attr('data-id');
        var id2 = $(this).attr('data-id2');
        var valor = $(this).val().replace(/(<([^>]+)>)/ig,"");
        var campo_error = (id2) ? $(".error-"+id+"-"+id2) : $(".error-"+id);
        var cambiar_clave = (id2) ? $("#cambiar_clave-"+id2).is(":checked") : $("#cambiar_clave").is(":checked");
        var valor_clave = (id2) ? $("[data-id=clave][data-id2="+id2+"]").val() : $("[data-id=clave]").val()
        //Nombre
        if (id==="nombre" && valor.length === 0){
            campo_error.html("El nombre no puede estar vacío.");
            campo_error.fadeIn(500);
            errores_datos = 1;
        }
        //NIF
        if (id==="nif" && comprobarNifNuevo($(this))){
            campo_error.html(comprobarNifNuevo($(this)));
            campo_error.fadeIn(500);
            errores_datos = 1;
        }
        //Teléfono 1
        if (id==="telefono_1" && (valor.length < 9 || !soloNumeros(valor))){
            campo_error.html("El teléfono 1 debe tener al menos 9 dígitos (solo números).");
            campo_error.fadeIn(500);
            errores_datos = 1;
        }
        //Teléfono 2
        if (id==="telefono_2" && valor.length > 0 && (valor.length < 9 || !soloNumeros(valor))){
            campo_error.html("El teléfono 2 es opcional pero debe tener al menos 9 dígitos (solo números).");
            campo_error.fadeIn(500);
            errores_datos = 1;
        }
        //Fax
        if (id==="fax" && valor.length > 0 && (valor.length < 9 || !soloNumeros(valor))){
            campo_error.html("El fax es opcional pero debe tener al menos 9 dígitos (solo números).");
            campo_error.fadeIn(500);
            errores_datos = 1;
        }
        //Email
        if (id==="email" && (valor.length === 0 || !emailValido(valor))){
            campo_error.html("El email no puede estar vacío y debe tener un formato válido.");
            campo_error.fadeIn(500);
            errores_datos = 1;
        }
        //Email
        if (id==="emailnuevo"){
            if (valor.length === 0 || !emailValido(valor)){
                campo_error.html("El email no puede estar vacío y debe tener un formato válido.");
                campo_error.fadeIn(500);
                errores_datos = 1;
            }
            else checkEmail(valor);
        }
        //Clave
        if (id==="clave" && cambiar_clave && (valor.length < 8 || valor.length > 16)){
            campo_error.html("La contraseña debe tener entre 8 y 16 caracteres.");
            campo_error.fadeIn(500);
            errores_datos = 1;
        }
        //Clave 2
        if (id==="clave2" && cambiar_clave && (valor !== valor_clave || valor.length < 8 || valor.length > 16)){
            campo_error.html("Las contraseñas no coinciden.");
            campo_error.fadeIn(500);
            errores_datos = 1;
        }
        //Pregunta
        if (id==="pregunta" && valor.toLowerCase()!=='madrid'){
            campo_error.html("La respuesta a la pregunta no es correcta.");
            campo_error.fadeIn(500);
            errores_datos = 1;
        }

    });

    //Limpio errores
    $(".comprobar").keyup(function(e) {
        var id = $(this).attr('data-id');
        var id2 = $(this).attr('data-id2');
        var campo_error = (id2) ? $(".error-"+id+"-"+id2) : $(".error-"+id);
        campo_error.html("");
        campo_error.fadeOut(500);
        errores_datos = 0;
    });

    //Solo números
    function soloNumeros(valor) {
        var numeros = /^[0-9]+$/;
        return valor.match(numeros);
    }

    //Email valido
    function emailValido(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    //Email no existe
    function checkEmail(email) {
        //Consulto email
        $.ajax({
            type: "POST",
            url: 'https://' + window.location.hostname + "/cliente/comprobaremailnuevo",
            data: {
                'email': email,
            },
            dataType: "html",
            success: function(datos) {
                var data = JSON.parse(datos);
                if (data.resultado){
                    $(".error-emailnuevo").html("El email ya está registrado.");
                    $(".error-emailnuevo").fadeIn(500);
                    errores_datos = 1;
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
            }
        });
    }

    //Checkbox cliente
    $(".checkbox_nuevo").click(function() {

        var id = $(this).attr('data-id');
        var id2 = $(this).attr('data-id2');

        if ($(this).hasClass('checked')){
            $(this).removeClass('checked');
            (id2) ? $("#"+id+"-"+id2).prop('checked', false) : $("#"+id).prop('checked', false);
            if (id==='cambiar_clave'){
                (id2) ? $("[data-id=campos_clave-"+id2+"]").fadeOut(500) : $(".campos_clave").fadeOut(500);
            }
        }
        else{
            $(this).addClass('checked');
            (id2) ? $("#"+id+"-"+id2).prop('checked', true) : $("#"+id).prop('checked', true);
            if (id==='cambiar_clave'){
                (id2) ? $("[data-id=campos_clave-"+id2+"]").fadeIn(500) : $(".campos_clave").fadeIn(500);
            }
        }

    });

    //Submit form datos cliente y contacto
    $(".datos_cliente").click(function() {
        //Trigger focusout a todos los campos para comprobar errores
        $("[data-id=nombre]").trigger("focusout");
        $("[data-id=nif]").trigger("focusout");
        $("[data-id=telefono_1]").trigger("focusout");
        $("[data-id=telefono_2]").trigger("focusout");
        $("[data-id=fax]").trigger("focusout");
        $("[data-id=email]").trigger("focusout");
        if ($("#cambiar_clave").is(":checked")){
            $("[data-id=clave]").trigger("focusout");
            $("[data-id=clave2]").trigger("focusout");
        }
        //Submit form
        (errores_datos === 0) ? form_datos.submit() : $('html, body').animate({scrollTop: form_direccion.offset().top}, 300);
    });

    //Submit form editar contacto
    $(".datos_contacto").click(function() {
        var id = $(this).attr('data-id');
        //Trigger focusout a todos los campos para comprobar errores
        $("[data-id=nombre][data-id2="+id+"]").trigger("focusout");
        $("[data-id=telefono_1][data-id2="+id+"]").trigger("focusout");
        $("[data-id=telefono_2][data-id2="+id+"]").trigger("focusout");
        $("[data-id=fax][data-id2="+id+"]").trigger("focusout");
        $("[data-id=email][data-id2="+id+"]").trigger("focusout");
        if ($("#cambiar_clave-"+id).is(":checked")){
            $("[data-id=clave][data-id2="+id+"]").trigger("focusout");
            $("[data-id=clave2][data-id2="+id+"]").trigger("focusout");
        }
        //Submit form
        (errores_datos === 0) ? $("#"+id).submit() : $('html, body').animate({scrollTop: $("#"+id).offset().top}, 300);
    });

    //Form datos direccion
    var errores_direccion = 0;

    //Editar dirección (desde cliente)
    $(".editar_direccion").click(function() {
        var id = $(this).attr('data-id');
        $("#"+id).fadeToggle(500);
        errores_direccion = 0;
        errores_datos = 0;
    });

    //Cerrar dirección (desde cliente o cesta)
    $(".cerrar_direccion").click(function() {
        var id = $(this).attr('data-id');
        var cesta = $(this).attr('data-cesta');
        (cesta === "cesta") ? $(".mascara").trigger("click") : $("#"+id).fadeOut(500);
        errores_direccion = 0;
        errores_datos = 0;
    });

    //Borrar dirección
    $(".borrar_direccion").click(function() {
        var id = $(this).attr('data-id');
        $("#borrar-"+id).fadeToggle(500);
    });
    $(".cerrar_borrar").click(function() {
        var id = $(this).attr('data-id');
        $("#borrar-"+id).fadeOut(500);
    });

    //Activa dirección
    $(".activa").hover(
        function() {
            $(this).css({'background-color':'rgb(180,0,0)'});
            $(this).html("DESACTIVAR");
        },
        function() {
            $(this).css({'background-color':'#82CD21'});
            $(this).html("ACTIVA");
        }
    );
    $(".inactiva").hover(
        function() {
            $(this).css({'background-color':'#82CD21'});
            $(this).html("ACTIVAR");
        },
        function() {
            $(this).css({'background-color':'rgb(180,0,0)'});
            $(this).html("INACTIVA");
        }
    );

    //Activo contacto
    $(".activo").hover(
        function() {
            $(this).css({'background-color':'rgb(180,0,0)'});
            $(this).html("DESACTIVAR");
        },
        function() {
            $(this).css({'background-color':'#82CD21'});
            $(this).html("ACTIVO");
        }
    );
    $(".inactivo").hover(
        function() {
            $(this).css({'background-color':'#82CD21'});
            $(this).html("ACTIVAR");
        },
        function() {
            $(this).css({'background-color':'rgb(180,0,0)'});
            $(this).html("INACTIVO");
        }
    );

    //Errores form datos dirección
    $(".comprobardireccion").focusout(function() {
        var id = $(this).attr('data-id');
        var id2 = $(this).attr('data-id2');
        var valor = $(this).val().replace(/(<([^>]+)>)/ig,"");
        var campo_error = $(".error-"+id+"-"+id2);
        //Dirección
        if (id==="direccion" && valor.length === 0){
            campo_error.html("El nombre de la vía no puede estar vacío.");
            campo_error.fadeIn(500);
            errores_direccion = 1;
        }
        //Número de vía
        if (id==="num_via" && valor.length === 0){
            campo_error.html("El número de la vía no puede estar vacío.");
            campo_error.fadeIn(500);
            errores_direccion = 1;
        }
        //Población
        if (id==="poblacion" && valor.length === 0){
            campo_error.html("La población no puede estar vacía.");
            campo_error.fadeIn(500);
            errores_direccion = 1;
        }
        //CP
        if (id==="cp" && (valor.length !== 5 || !soloNumeros(valor))){
            campo_error.html("El código postal debe tener 5 dígitos (solo números).");
            campo_error.fadeIn(500);
            errores_direccion = 1;
        }
        //Provincia
        if (id==="id_provincia" && valor===""){
            campo_error.html("Debes seleccionar una provincia.");
            campo_error.fadeIn(500);
            errores_direccion = 1;
        }
        //Teléfono 1
        if (id==="telefono_1" && (valor.length < 9 || !soloNumeros(valor))){
            campo_error.html("El teléfono 1 debe tener al menos 9 dígitos (solo números).");
            campo_error.fadeIn(500);
            errores_direccion = 1;
        }
        //Teléfono 2
        if (id==="telefono_2" && valor.length > 0 && (valor.length < 9 || !soloNumeros(valor))){
            campo_error.html("El teléfono 2 es opcional pero debe tener al menos 9 dígitos (solo números).");
            campo_error.fadeIn(500);
            errores_direccion = 1;
        }
        //Fax
        if (id==="fax" && valor.length > 0 && (valor.length < 9 || !soloNumeros(valor))){
            campo_error.html("El fax es opcional pero debe tener al menos 9 dígitos (solo números).");
            campo_error.fadeIn(500);
            errores_direccion = 1;
        }
    });

    //Limpio errores
    $(".comprobardireccion").keyup(function(e) {
        var id = $(this).attr('data-id');
        var id2 = $(this).attr('data-id2');
        var campo_error = $(".error-"+id+"-"+id2);
        campo_error.html("");
        campo_error.fadeOut(500);
        errores_direccion = 0;
    });

    //Submit form direcciones cliente
    $(".direcciones_cliente").click(function() {
        var id = $(this).attr('data-id');
        var cesta = $(this).attr('data-cesta');
        //Trigger focusout a todos los campos para comprobar errores
        $("[data-id=direccion][data-id2="+id+"]").trigger("focusout");
        $("[data-id=num_via][data-id2="+id+"]").trigger("focusout");
        $("[data-id=poblacion][data-id2="+id+"]").trigger("focusout");
        $("[data-id=cp][data-id2="+id+"]").trigger("focusout");
        $("[data-id=id_provincia][data-id2="+id+"]").trigger("focusout");
        $("[data-id=telefono_1][data-id2="+id+"]").trigger("focusout");
        $("[data-id=telefono_2][data-id2="+id+"]").trigger("focusout");
        $("[data-id=fax][data-id2="+id+"]").trigger("focusout");
        //Submit form
        if(errores_direccion === 0){
            $("#"+id).submit()
        }
        else{
            (cesta === "cesta") ? $('.formulario_direccion').animate({scrollTop: 0}, 300) : $('html, body').animate({scrollTop: $("#"+id).offset().top}, 300);
        }

    });

    $(".copiar_pedido").click(function() {
        var id = $(this).attr('data-id');
        $("#copiar-"+id).fadeToggle(500);
    });
    $(".cerrar_copiar").click(function() {
        var id = $(this).attr('data-id');
        $("#copiar-"+id).fadeOut(500);
    });

    $(".modificar_pedido").click(function() {
        var id = $(this).attr('data-id');
        $("#modificar-"+id).fadeToggle(500);
    });
    $(".cerrar_modificar").click(function() {
        var id = $(this).attr('data-id');
        $("#modificar-"+id).fadeOut(500);
    });

    $(".cancelar_pedido").click(function() {
        var id = $(this).attr('data-id');
        $("#cancelar-"+id).fadeToggle(500);
    });
    $(".cerrar_cancelar").click(function() {
        var id = $(this).attr('data-id');
        $("#cancelar-"+id).fadeOut(500);
    });
    $(".cerrar_mensaje_nuevo").click(function() {
        $(".mensaje_nuevo").fadeOut(500);
    });

    //Submit form nuevo cliente
    $(".nuevo_cliente").click(function() {
        //Trigger focusout a todos los campos para comprobar errores
        $("[data-id=nombre]").trigger("focusout");
        $("[data-id=nif]").trigger("focusout");
        $("[data-id=telefono_1]").trigger("focusout");
        $("[data-id=telefono_2]").trigger("focusout");
        $("[data-id=fax]").trigger("focusout");
        $("[data-id=emailnuevo]").trigger("focusout");
        $("[data-id=clave]").trigger("focusout");
        $("[data-id=clave2]").trigger("focusout");
        $("[data-id=direccion]").trigger("focusout");
        $("[data-id=num_via]").trigger("focusout");
        $("[data-id=poblacion]").trigger("focusout");
        $("[data-id=cp]").trigger("focusout");
        $("[data-id=id_provincia]").trigger("focusout");
        $("[data-id=pregunta]").trigger("focusout");

        //Submit form
        (errores_direccion === 0 && errores_datos === 0) ? form_nuevo.submit() : $('html, body').animate({scrollTop: $(".cliente").offset().top}, 300);

    });

    //Datepicker envio
    $("#datepicker_envio").datepicker({
        defaultDate: +$("#plazo_envio").val(),
        minDate: +$("#plazo_envio").val(),
        dateFormat: 'dd/mm/yy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
        prevText: '<',
        nextText: '>',
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: '',
        buttonImageOnly: false,
        firstDay: 1
    });

    //Seleccionar direccion de envio
    $(".seleccionar_envio").click(function() {
        var id = $(this).attr('data-id');
        var input = $("[name=direccion_envio]");
        $("[data-id=envio-"+input.val()+"]").removeClass("selected");
        $("[data-id=envio-"+id+"]").addClass("selected");
        input.val(id);
        //Borro los datos de tienda
        $(".select_tienda").val("");
        $(".horario_tienda").fadeOut(500);
        //Borro campo de error
        $(".error-direccion_envio").html("");
    });

    //Seleccionar direccion de facturacion
    $(".seleccionar_facturacion").click(function() {
        var id = $(this).attr('data-id');
        var input = $("[name=direccion_facturacion]");
        $("[data-id=facturacion-"+id+"]").addClass("selected");
        $("[data-id=facturacion-"+input.val()+"]").removeClass("selected");
        input.val(id);
        //Borro campo de error
        $(".error-direccion_facturacion").html("");
    });

    //Seleccionar forma de pago
    $(".radio_pago").click(function() {

        var id = $(this).attr('data-id');
        $("#forma_pago-"+id).prop('checked', true);
        //Cambio radio
        $(".radio_pago").removeClass("checked");
        $("[data-id2=radio_pago-"+id+"]").addClass("checked");
        //Borro campo de error
        $(".error-forma_pago").html("");

    });

    //Seleccionar tienda
    $(".select_tienda").change(function() {
        //Cambio dirección de envio y muestro horario
        seleccionar_tienda();
    });

    function seleccionar_tienda(){
        //Cambio dirección de envío
        var input = $("[name=direccion_envio]");
        $("[data-id=envio-"+input.val()+"]").removeClass("selected");
        $("[data-id=envio-tienda]").addClass("selected");
        input.val('tienda');
        //Averiguo cual ha marcado
        var id = $(".select_tienda").val();
        //Oculto los mensajes
        $(".horario_tienda").hide();
        //Muestro el que toca
        $("#horario-"+id).fadeIn(500);
        //Borro campo de error
        $(".error-direccion_envio").html("");

    }

    //Nueva dirección (en la cesta)
    $(".nueva_direccion").click(function() {
        var id = $(this).attr('data-id');
        var id2 = $(this).attr('data-id2');
        $("#tiponueva").val(id);
        $("#viajanueva").val(id2);
        $("[name=tipo]").val(id);
        $(".mascara").fadeIn(500);
        $(".formulario_direccion").fadeIn(500);
        errores_direccion = 0;
        errores_datos = 0;
    });

    $(".mascara").click(function() {
        $(".formulario_direccion").fadeOut(500);
        $(this).fadeOut(500);
    });

    //Editar dirección desde cesta
    $(".editar_direccion_cesta").click(function() {
        var id = $(this).attr('data-id');
        var id2 = $(this).attr('data-id2');
        var row = $(this).attr('data-row');
        $("#tiponueva").val(id);
        $("#viajanueva").val(id2);
        $("#titulo_editar_direccion").html("Editar dirección");
        consultarDireccion(row);
        errores_direccion = 0;
        errores_datos = 0;
    });

    //Consulto dirección
    function consultarDireccion(id) {
        //Consulto dirección
        $.ajax({
            type: "POST",
            url: 'https://' + window.location.hostname + "/cliente/consultardireccion",
            data: {
                'id': id,
            },
            dataType: "html",
            success: function(datos) {
                var data = JSON.parse(datos);
                console.log(data);
                //Relleno form
                $("[name=id]").val(id);
                $("[name=titulo]").val(data.titulo);
                $("[name=tipo]").val(data.tipo);
                //Contactos
                rellenarContactos(data.contactos);
                $("[name=tipo_via]").val(data.tipo_via);
                $("[name=direccion]").val(data.direccion);
                $("[name=num_via]").val(data.num_via);
                $("[name=resto_direccion]").val(data.resto_direccion);
                $("[name=poblacion]").val(data.poblacion);
                $("[name=cp]").val(data.cp);
                $("[name=id_provincia]").val(data.id_provincia);
                $("[name=telefono_1]").val(data.telefono_1);
                $("[name=telefono_2]").val(data.telefono_2);
                $("[name=fax]").val(data.fax);
                $("[name=observaciones]").val(data.observaciones);
                $(".cerrar_direccion").attr('data-cesta',data.cesta);
                $(".direcciones_cliente").attr('data-cesta',data.cesta);
                //Muetsro más cara y form
                $(".mascara").fadeIn(500);
                $(".formulario_direccion").fadeIn(500);

            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
            }
        });
    }

    function rellenarContactos(contactos){

        //Limpio campos por si había editado otra
        $("[data-id=contacto-nueva]").removeClass("checked");
        $("[data-id=checkbox-nuevo]").prop('checked', false);

        if (contactos){
            var array = contactos.split(",");
            for (var i=0; i<array.length; i++){
                var contacto = array[i];
                $("[name=contacto-"+contacto+"]").prop('checked', true);
                $("[data-id=contacto-nueva][data-id2="+contacto+"]").addClass("checked");
            }
        }

    }

    var errores_confirmar = 0;

    $(".comprobartramitar").focusout(function() {
        var id = $(this).attr('data-id');
        var campo = $("[data-id="+id+"]");
        var valor = $(this).val().replace(/(<([^>]+)>)/ig,"");
        var campo_error = $(".error-"+id);
        //Dirección facturación
        if (id==="direccion_facturacion" && valor.length === 0){
            campo_error.html("Debes seleccionar una dirección de facturación.");
            campo_error.fadeIn(500);
            errores_confirmar = 1;
        }
        //Forma de pago
        if (id==="forma_pago" && !$('[name='+ id +']:checked').length){
            campo_error.html("Debes seleccionar una forma de pago.");
            campo_error.fadeIn(500);
            errores_confirmar = 1;
        }
        //Dirección envio
        if (id==="direccion_envio" && valor.length === 0){
            campo_error.html("Debes seleccionar una dirección de envío.");
            campo_error.fadeIn(500);
            errores_confirmar = 1;
        }
        //Fecha entrega
        if (id==="hora_entrega" && valor.length === 0){
            campo_error.html("Debes seleccionar una hora.");
            campo_error.fadeIn(500);
            errores_confirmar = 1;
        }
        //Fecha entrega
        if (id==="fecha_entrega" && valor.length === 0){
            campo_error.html("Debes seleccionar una fecha.");
            campo_error.fadeIn(500);
            errores_confirmar = 1;
        }
    });

    //Limpio errores
    $(".comprobartramitar").keyup(function(e) {
        var id = $(this).attr('data-id');
        var campo_error = $(".error-"+id);
        campo_error.html("");
        campo_error.fadeOut(500);
        errores_confirmar = 0;
    });
    $(".comprobartramitar").focus(function() {
        var id = $(this).attr('data-id');
        var campo_error = $(".error-"+id);
        campo_error.html("");
        campo_error.fadeOut(500);
        errores_confirmar = 0;
    });


    //Submit form confirmar
    $(".confirmar_pedido").click(function() {
        //Borrar errores
        $(".error").html("");
        errores_confirmar = 0;

        //Trigger focusout a todos los campos para comprobar errores
        $("[data-id=direccion_facturacion]").trigger("focusout");
        $("[data-id=forma_pago]").trigger("focusout");
        $("[data-id=direccion_envio]").trigger("focusout");
        $("[data-id=hora_entrega]").trigger("focusout");
        $("[data-id=fecha_entrega]").trigger("focusout");
        var campo = $( "span:contains('Debes')").first();

        //Submit form
        (errores_confirmar === 0) ? form_tramitar.submit() : $('html, body').animate({scrollTop: campo.offset().top - 300}, 300);

    });

    //Validar código desde cesta
    $(".validar_codigo").click(function() {
        $("[name=accion_codigo]").val("validar");
        form_tramitar.submit();
    });

    //Anular código desde cesta
    $(".anular_codigo").click(function() {
        $("[name=accion_codigo]").val("anular");
        form_tramitar.submit();
    });

    $(".finalizar_pedido").click(function(){
        window.location.href = $(this).attr("href");
        $(this).removeAttr("href");
        $(this).empty();
        $(this).append("PROCESANDO...");
    });

    //Obtengo divs de filtros
    var div_direccion = $(".direccion");
    var div_pedido_cliente = $(".pedido_cliente");
    var div_filtro_3 = $(".direccion[data-filtro='3']");
    var div_filtro_6 = $(".direccion[data-filtro='6']");
    var div_filtro_12 = $(".direccion[data-filtro='12']");
    var div_filtro_0 = $(".direccion[data-filtro='0']");
    var span_total_pedidos = $(".num_pedidos span");
    //Aplico filtro inicial
    filtro_inicial();

    //Filtro de 3 meses al entrar (O si no el siguiente...)
    function filtro_inicial(){

        //Si estoy en pedidos
        if (span_total_pedidos.length){

            div_direccion.hide();
            div_pedido_cliente.hide();
            if (div_filtro_3.length){
                div_filtro_3.show();
                span_total_pedidos.html(div_filtro_3.length);
                $(".filtro span").removeClass("filtro_activo");
                $(".filtro span[data-value='3']").addClass("filtro_activo");
            }
            else if (div_filtro_6.length){
                div_filtro_6.show();
                span_total_pedidos.html(div_filtro_6.length);
                $(".filtro span").removeClass("filtro_activo");
                $(".filtro span[data-value='6']").addClass("filtro_activo");
            }
            else if (div_filtro_12.length){
                div_filtro_12.show();
                $(".filtro span").removeClass("filtro_activo");
                $(".filtro span[data-value='12']").addClass("filtro_activo");
                span_total_pedidos.html(div_filtro_12.length);
            }
            else if (div_filtro_0.length){
                div_direccion.show();
                $(".filtro span").removeClass("filtro_activo");
                $(".filtro span[data-value='0']").addClass("filtro_activo");
                span_total_pedidos.html(div_filtro_0.length);
            }
            else{
                //No hay pedidos
                span_total_pedidos.html("0");
            }

        }

    }




    //Cambio filtros
    $(".filtro span").click(function(){
        //Detecto filtro pulsado
        var filtro = $(this).attr('data-value');
        $(".filtro span").removeClass("filtro_activo");
        $(this).addClass("filtro_activo");
        //Cambio
        cambiar_filtros(filtro);
        //Büsqueda
        var busqueda = $("#busqueda_pedidos").val().toLowerCase();
        buscar(busqueda,filtro);
    });

    function cambiar_filtros(filtro){

        if (filtro === "3"){
            div_direccion.hide();
            div_filtro_3.show();
            span_total_pedidos.html(div_filtro_3.length);
        }
        else if (filtro === "6"){
            div_direccion.hide();
            div_filtro_3.show();
            div_filtro_6.show();
            span_total_pedidos.html(div_filtro_3.length + div_filtro_6.length);
        }
        else if (filtro === "12"){
            div_direccion.hide();
            div_filtro_3.show();
            div_filtro_6.show();
            div_filtro_12.show();
            span_total_pedidos.html(div_filtro_3.length + div_filtro_6.length + div_filtro_12.length);
        }
        else{
            div_direccion.hide();
            div_direccion.show();
            span_total_pedidos.html(div_direccion.length);
        }

    }

    function buscar(busqueda,filtro){

        //Si no está vacío
        if (busqueda.length >= 3){
            div_direccion.hide();
            //Cambio a todos
            $(".filtro span").removeClass("filtro_activo");
            $(".filtro span[data-value='0']").addClass("filtro_activo");
            //Muestro los que coinciden
            var div_buscar_nombre =  $(".direccion[data-buscar*='"+busqueda+"']" );
            var div_buscar_id =  $(".direccion[data-id*='"+busqueda+"']" );
            div_buscar_nombre.show(); //Los que contienen el nombre
            div_buscar_id.show(); //Los que contienen el id
            //Total pedidos
            span_total_pedidos.html(div_buscar_nombre.length + div_buscar_id.length);
        }
        //Si no, muestro todos
        else{
            div_pedido_cliente.hide();
            cambiar_filtros(filtro);
        }

    }

    //Buscar pedidos
    $("#busqueda_pedidos").keyup(function(){
        var busqueda = $(this).val().toLowerCase();
        var filtro = $(".filtro_activo").attr('data-value');
        buscar(busqueda,filtro);

        //Muestro el icono de limpiar
        if (busqueda.length){
            $(".limpiar_pedidos").show();
        }
        else{
            $(".limpiar_pedidos").hide();
        }

    });

    //Limpiar pedidos
    $(".limpiar_pedidos").click(function(){
        $("#busqueda_pedidos").val("");
        $(this).hide();

    });





});

