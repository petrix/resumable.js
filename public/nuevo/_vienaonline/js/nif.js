/**
 * Created by jairogarciarincon on 2/8/17.
 */

//CAMPO NIF
$(function() {
    //Para la página del panel que revisa los NIF
    $('.tiponif').click(function() {
        var id = $(this).attr('data-id');
        if (id==='todos'){
            $('.ulnif').show();
        }
        else{
            $('.ulnif').hide();
            $('.'+id).show();
        }
    });

    //Solo caracteres alfanuméricos
    $('#campo_nif').keypress(function (e) {
        var regex = new RegExp("^[a-zA-Z0-9]+$");
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (regex.test(str)) {
            return true;
        }
        e.preventDefault();
        return false;
    });

    //Validar al entrar
    if ($("#campo_nif").length){
        comprobarNif();
    }

    //validar on autocomplete, keyup, input o blur
    $('#campo_nif').bind("change keyup blur input",function(){
        comprobarNif();
    });

    //Validar on save
    $('#comprobarnif').click(function () {
        if (comprobarNif()===1){
            $('#form_cliente').submit();
        }
    });

});

function comprobarNif(){

    //recojo valor del input y letras en mayúscula
    var nif = $('#campo_nif').val().toUpperCase();

    //añado 0 a la izquierda
    while (nif.length < 9) {
        nif = '0' + nif;
    }

    //asigno valor al input
    $(this).val(nif);

    //longitud y formato
    var formato = new RegExp('[A-Z0-9]{9}');
    if (formato.test(nif)) {

        //tipos
        var dni = new RegExp('[0-9]{8}[A-Z]{1}');
        var nifPf = new RegExp('[KLM]{1}[0-9]{7}[A-J0-9]{1}');
        var nie = new RegExp('[XYZ]{1}[0-9]{7}[A-Z]{1}');
        var nifPj = new RegExp('(?![IÑOTKLM])[A-W]{1}[0-9]{7}[A-J0-9]{1}');
        var soloNum = new RegExp('[0-9]');
        var dcNum = new RegExp('[ABCDEFGHJUV]');
        var dcLet = new RegExp('[KLMPQRSNW]');

        //PERSONA FÍSICA CON DNI
        if (dni.test(nif)) {

            var letrasDni = 'TRWAGMYFPDXBNJZSQVHLCKE';
            var numerosNif = nif.substr(0, 8);
            var letraNif = nif.substr(8, 1);
            var letraCalculada = letrasDni.charAt(numerosNif % 23);
            var mensaje = 'PERSONA FÍSICA CON DNI, letra ' + letraNif + ' incorrecta, debería ser ' + letraCalculada;
            return errorNif(letraCalculada,letraNif,mensaje);
        }

        //PERSONA EXTRANJERA CON NIE
        else if (nie.test(nif)){

            var letrasDni = 'TRWAGMYFPDXBNJZSQVHLCKE';
            var letrasDc = 'XYZ';
            var letraNie = nif.substr(0, 1);
            var numNie = letrasDc.indexOf(letraNie);
            var numerosNie = numNie+nif.substr(1, 7);
            var dcNie = nif.substr(8, 1);
            var dcCalculado = letrasDni.charAt(numerosNie % 23);
            var mensaje = 'PERSONA EXTRANJERA CON NIE, letra ' + dcNie + ' incorrecta, debería ser ' + dcCalculado;
            return errorNif(dcCalculado,dcNie,mensaje);
        }

        //PERSONA JURÍDICA CON CIF O DNIS ESPECIALES (se calculan como cifs)
        else if ((nifPj.test(nif)) || (nifPf.test(nif))){

            var letrasDc = 'JABCDEFGHI';
            var letraNif = nif.substr(0, 1);
            var numerosNif = nif.substr(1, 8);
            var dcNif = nif.substr(8, 1);

            //suma de posiciones pares
            var A = 0;
            for (var i=1; i<=5; i+=2){
                A += parseInt(numerosNif.substr(i, 1));
            }
            //suma de posiciones impares x2
            var B = 0;
            for (var i=0; i<=6; i+=2){
                var num = 2*parseInt(numerosNif.substr(i, 1));
                B += (num > 9) ? (1 + (num - 10)) : num;
            }
            //calcular D
            var C = A+B;
            var E = parseInt(C % 10);
            var D = (E > 0) ? (10 - E) : 0;
            if ((E===0) && (soloNum.test(dcNif))){
                D = 0;
            }

            var tipo = (nifPj.test(nif)) ? 'PERSONA JURÍDICA ,' : 'DNI ESPECIAL ,';

            //calcular Dc
            if (dcNum.test(letraNif)){
                var dcCalculado = D;
                var mensaje = tipo + 'dc ' + dcNif + ' incorrecto, debería ser ' + dcCalculado;
                return errorNif(dcCalculado,parseInt(dcNif),mensaje);
            }
            else if (dcLet.test(letraNif)){
                var dcCalculado = letrasDc.charAt(D);
                var mensaje = tipo + 'dc ' + dcNif + ' incorrecta, debería ser ' + dcCalculado;
                return errorNif(dcCalculado,dcNif,mensaje);
            }
            else{
                var mensaje = 'ERROR DE NIF';
                return errorNif(0,1,mensaje);
            }
        }

        //EXTRANJEROS O ERRÓNEOS
        else{
            var mensaje = 'NIF INCOMPLETO O NO VÁLIDO';
            return errorNif(0,1,mensaje);
        }

    }

};

function errorNif(calculada,introducida,mensaje){
    if (calculada!==introducida){
        $('.alert_nif').show();
        $('.alert_nif span').html('');
        $('.alert_nif span').prepend(mensaje);
        $('#campo_nif').css('background-color','rgba(255,0,0,0.1)');
        return 0;
    }
    else{
        $('.alert_nif').hide();
        $('#campo_nif').css('background-color','#fff');
        return 1;
    }
}