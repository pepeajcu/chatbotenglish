const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')


//=====================================================================


const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Para continuar con el flujo, adquiere nuestro servicios de creación de chatbots...'])


const flowCursos = addKeyword(['cursos', 'Cursos']).addAnswer(
    [
        '🚀 ¿Listo para aprender ingles en el 2024?',
        '[*B1*] Intermedio',
        '[*B2*] Intermedio-Alto.',
        '[*C1*] Avanzado ',
        'Escribe el código del curso para ver más información...', ])
    .addAnswer(
        {
            buttons:[
                {
                    body: 'B1'
                },
                {
                    body: 'B2'
                },
                {
                    body: 'C1'
                }
            ]
        }
    )
    .addAnswer(
        [
            'Escribe *2* para continuar...',
        ],    
        null,
        null,
        [flowSecundario]
        )



const flowPasoDos = addKeyword(['Pago listo', 'pago listo', 'si ya pague', 'ya hice el pago'])
    .addAnswer('¡Perfecto! Ya hiciste el pago')
    .addAnswer(
        [
            'Paso 2: ahora asignate al curso correspondiente aquí: https://forms.office.com/pages/responsepage.aspx?id=oeHGDlM-F06IPf-A-64zjrlbkwFnk2ZBlyAuN4oALuhUMko5N1RWWTlCUjhIWlVCRUtNOEFSVEFGMi4u',

            'Responde *2* si ya te asignaste para el siguiente paso...',
        ],    
        null,
        null,
        [flowSecundario]
        )
 


const flowInscripciones = addKeyword(['Inscripciones', 'inscripciones'])
    .addAnswer('¡Inscríbete! Fechas de asignaciones: 29 enero al 04 de febrero')
    .addAnswer(
        [
            'Paso 1: realiza tu pago desde este enlace: https://pay.neolink.com.gt/VEL1779118122b6ig83qnslc4w1yp7/1634938639c75d22b/166189908436d3ee0',

            'Responde *Pago listo* o *1* si ya hiciste el pago',
        ],
    null,
    null,
    [flowPasoDos]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo', 'ola', 'Hola', 'HOla', 'Ola', 'buenas', 'me gustaria info', 'quiero info', 'info', 'menu', 'Menu', 'Inicio'])
    .addAnswer('🙌 Hola bienvenido a nuestra *CESG English Academy*')
    .addAnswer(
        [
            'Escribe la palabra para ver la información de tu interes:',
            '👉 *Inscripciones* para ver info sobre nuestras inscripciones',
            '👉 *Cursos*  para informacion de los cursos',
        ],
        null,
        null,
        [flowCursos, flowInscripciones]
    )


//=====================================================================


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
