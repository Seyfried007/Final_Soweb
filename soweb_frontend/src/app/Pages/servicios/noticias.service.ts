import { Injectable } from '@angular/core';

export interface Noticia {
  id: number,
  titulo: string;
  texto: string;
  cuerpo: string;
  imagePath: string;
  autor: string;
  avatarPath: string;
  fecha: string;
  categorias: string[];
  etiquetas: string[];
  likes: number;
  comentarios: Comentario[];
}
export interface Comentario {
  id: number;
  autor: string;
  texto: string;
  fecha: string;
  respuestas?: Comentario[]; //recursividad
  mostrandoRespuesta?:boolean;
}


@Injectable({ providedIn: 'root' })
export class NoticiasService {
  private noticias: Noticia[] = [
    {
      id: 0,
      titulo: 'Normas ISO impulsan la calidad en procesos industriales',
      texto: 'Empresas mejoran su gestión de calidad aplicando la norma ISO 9001',
      cuerpo: `
      Las empresas en todo el mundo están reconociendo la importancia de mantener altos estándares de calidad en sus procesos industriales para mantenerse competitivas. En este sentido, las normas ISO, especialmente la ISO 9001, se han convertido en una herramienta clave para garantizar la calidad en la producción y la mejora continua. La norma ISO 9001 proporciona un marco estructurado que permite a las empresas establecer un sistema de gestión de calidad basado en la satisfacción del cliente, la mejora continua y la implementación de procesos eficaces.<br>
      Esta norma facilita la estandarización de los procedimientos operativos, lo que asegura que todas las áreas de una organización trabajen de manera coordinada, eficiente y alineada con los objetivos organizacionales. Además, al adoptar la ISO 9001, las empresas pueden identificar y corregir posibles fallos en los procesos, lo que se traduce en una mayor eficiencia operativa y reducción de desperdicios. La norma también promueve la transparencia y la trazabilidad en todos los procesos, lo que mejora la comunicación interna y la toma de decisiones.<br>
      Por otro lado, la implementación de ISO 9001 implica un compromiso a largo plazo con la calidad, lo que requiere un esfuerzo continuo por parte de toda la organización. Esto incluye la capacitación constante de los empleados, la revisión periódica de los procesos y la evaluación de la eficacia del sistema de gestión. A medida que las empresas logran la certificación ISO 9001, no solo mejoran su capacidad operativa, sino que también ganan una ventaja competitiva en el mercado global, demostrando a sus clientes y socios comerciales su compromiso con la calidad y la mejora constante.<br>
      La aplicación de la ISO 9001 ha permitido a numerosas organizaciones alcanzar estándares internacionales de calidad, lo que se traduce en una mayor satisfacción del cliente, un aumento de la lealtad de los consumidores y, en última instancia, en el éxito sostenido de la empresa. En resumen, la implementación de las normas ISO en los procesos industriales no solo mejora la calidad, sino que también contribuye a una cultura organizacional más sólida, enfocada en la eficiencia, la transparencia y la sostenibilidad.
      `.trim(),
      imagePath: 'assets/caratulas/imagen_noticias_recientes_1.svg',
      autor: 'Carlos Méndez',
      avatarPath: 'assets/redactores/fotoretrado_redactor_1.svg',
      fecha: '19 Feb. 2025',
      categorias: ['Certificación y Normas Internacionales', 'Mejora Continua y Gestión de procesos', 'Sostenibilidad y Responsabilidad Corporativa'],
      etiquetas: ['Certificación ISO','Sostenibilidad','Gestión de calidad', 'Protección de Información'],
      likes: 15,
      comentarios:[{
        id: 0,
        autor: "Cynthia Morales",
        texto: `La ISO 9001 realmente ayuda a mejorar los procesos, hacerlo todo más eficiente y ganar la confianza de los clientes. Es una gran forma de mantenerse competitivo`,
        fecha: '2025-05-12',
        respuestas:[]
      }]
    },
    {
      id: 1,
      titulo: 'ISO 14001 gana terreno en industrias sostenibles',
      texto: 'La ISO 14001 ayuda a reducir el impacto ambiental en la industria.',
      cuerpo: `
      En un contexto donde las preocupaciones por el cambio climático y la sostenibilidad ambiental son cada vez mayores, las empresas han comenzado a entender que sus operaciones deben ser más responsables con el entorno. La norma ISO 14001, que establece los requisitos para un sistema de gestión ambiental eficaz, ha ganado una popularidad significativa como una herramienta fundamental para ayudar a las organizaciones a alcanzar sus objetivos ambientales.<br>
      La ISO 14001 ayuda a las empresas a identificar y controlar sus impactos ambientales, estableciendo un sistema que no solo busca cumplir con las normativas locales e internacionales, sino que también promueve la mejora continua en la gestión de los recursos naturales, el manejo de residuos y la reducción de la huella de carbono. Con la implementación de esta norma, las empresas tienen la capacidad de minimizar su impacto en el medio ambiente, mejorar su eficiencia energética, gestionar mejor el consumo de agua y reducir sus emisiones contaminantes.<br>
      Además de los beneficios ecológicos, la ISO 14001 también trae consigo ventajas económicas. Al reducir el consumo de recursos y mejorar la eficiencia de los procesos, las empresas pueden experimentar una disminución significativa de costos operativos. Esto se debe a la optimización del uso de energía, la reducción del desperdicio de materiales y la mejora de la gestión de los residuos, lo que también permite a las organizaciones minimizar los riesgos financieros asociados con la gestión ambiental.<br>
      Una de las principales ventajas de la implementación de la ISO 14001 es la mejora de la reputación corporativa. En un mercado donde los consumidores y las partes interesadas están cada vez más comprometidos con las prácticas sostenibles, las empresas que cuentan con esta certificación demuestran su responsabilidad ambiental, lo que puede traducirse en una mayor confianza y preferencia por parte de los consumidores. Esto no solo refuerza la imagen de la marca, sino que también abre puertas a nuevas oportunidades de negocio, especialmente en industrias donde la sostenibilidad es una prioridad.<br>
      En resumen, la ISO 14001 no solo es una herramienta que ayuda a las empresas a cumplir con sus responsabilidades ambientales, sino que también promueve la eficiencia operativa y la competitividad a largo plazo, al tiempo que contribuye de manera significativa a la preservación del medio ambiente y al bienestar de las generaciones futuras.
      `.trim(),
      imagePath: 'assets/caratulas/imagen_noticias_recientes_2.svg',
      autor: 'Lucía Torres',
      avatarPath: 'assets/redactores/fotoretrado_redactor_2.svg',
      fecha: '03 Mar. 2025',
      categorias: ['Certificación y Normas Internacionales', 'Mejora Continua y Gestión de procesos', 'Sostenibilidad y Responsabilidad Corporativa'],
      etiquetas: ['Certificación ISO','Sostenibilidad','Gestión de calidad', 'Protección de Información'],
      likes: 10,
      comentarios:[{
        id: 0,
        autor: "Carlos Rodríguez",
        texto: `¡Qué buena idea! Las tarjetas de regalo son una forma genial de fidelizar clientes y aumentar las ventas. ¡Seguro que el diseño es muy atractivo!`,
        fecha: '2025-03-20',
        respuestas:[]
      }]
    },
    {
      id: 2,
      titulo: 'Certificación ISO 45001 mejora la seguridad laboral',
      texto: 'La norma ISO 45001 refuerza la seguridad y salud en el trabajo.',
      cuerpo: `
      La seguridad laboral es un componente esencial de cualquier organización que quiera proteger la salud y el bienestar de sus empleados, reducir el ausentismo y mejorar la productividad. En este sentido, la norma ISO 45001 juega un papel fundamental en la creación de entornos laborales más seguros y saludables, proporcionando una estructura clara para la gestión de la seguridad y salud ocupacional. Esta norma, que reemplaza a la OHSAS 18001, proporciona un enfoque más integrado y preventivo, permitiendo a las organizaciones identificar, controlar y mitigar los riesgos en sus lugares de trabajo.<br>
      Implementar ISO 45001 implica un análisis exhaustivo de los peligros y riesgos que enfrentan los empleados en sus labores diarias. Esto incluye la identificación de riesgos físicos, químicos, biológicos y ergonómicos, así como la evaluación de los procesos laborales que podrían comprometer la seguridad de los trabajadores. Una vez identificados los riesgos, las organizaciones deben implementar controles apropiados, elaborar procedimientos de seguridad, proporcionar capacitación continua a los empleados y fomentar una cultura de seguridad en todos los niveles de la empresa.<br>
      Además, la norma ISO 45001 pone un énfasis especial en la participación activa de los trabajadores en la identificación de riesgos y la propuesta de soluciones. Esto crea un entorno de trabajo más colaborativo, donde los empleados se sienten más involucrados en las decisiones que afectan su seguridad y salud. La participación activa de los trabajadores también mejora el compromiso con la norma y asegura que las medidas implementadas sean prácticas y eficaces en el contexto laboral específico de cada organización.<br>
      Implementar la ISO 45001 no solo ayuda a prevenir accidentes laborales y enfermedades profesionales, sino que también mejora la moral de los empleados. Cuando los trabajadores se sienten seguros en su entorno de trabajo, su satisfacción y productividad aumentan considerablemente. Esto, a su vez, tiene un impacto positivo en los resultados financieros de la empresa, ya que la reducción de incidentes laborales contribuye a la disminución de costos relacionados con seguros, indemnizaciones y tiempos de inactividad.<br>
      En resumen, la implementación de la ISO 45001 es una inversión estratégica en la seguridad y salud de los empleados. Al hacerlo, las empresas no solo cumplen con las regulaciones y estándares internacionales, sino que también crean un ambiente de trabajo más saludable, eficiente y productivo, lo que se traduce en beneficios a largo plazo tanto para la organización como para sus empleados.
      `.trim(),
      imagePath: 'assets/caratulas/imagen_noticias_recientes_3.svg',
      autor: 'Diego Rivas',
      avatarPath: 'assets/redactores/fotoretrado_redactor_3.svg',
      fecha: '22 Ene. 2025',
      categorias: ['Certificación y Normas Internacionales', 'Mejora Continua y Gestión de procesos', 'Sostenibilidad y Responsabilidad Corporativa'],
      etiquetas: ['Certificación ISO','Sostenibilidad','Gestión de calidad', 'Protección de Información'],
      likes: 23,
      comentarios:[{
        id: 0,
        autor: "Juan Pérez",
        texto: `Es genial ver que el trabajo sigue avanzando. Mantener todo en progreso es clave para cumplir con las metas. ¡Seguro que el resultado será excelente!`,
        fecha: '2025-06-06',
        respuestas:[]
      }]
    },
    {
      id: 3,
      titulo: 'ISO 50001 transforma la eficiencia energética',
      texto: 'ISO 50001 permite un uso más eficiente de la energía en las plantas.',
      cuerpo: `
      La eficiencia energética es uno de los mayores desafíos que enfrentan las empresas en la actualidad, especialmente en un contexto donde la energía se ha vuelto un recurso cada vez más costoso y escaso. La norma ISO 50001, diseñada para ayudar a las organizaciones a mejorar su desempeño energético, ha demostrado ser una herramienta invaluable para gestionar el consumo de energía de manera eficiente. Esta norma establece un marco de trabajo claro para implementar sistemas de gestión energética, lo que permite a las empresas reducir su huella de carbono, mejorar su rentabilidad y cumplir con los objetivos de sostenibilidad.<br>
      ISO 50001 se enfoca en la mejora continua del uso de la energía, estableciendo políticas energéticas y objetivos claros que se alinean con las metas generales de la organización. La implementación de la norma implica la evaluación constante de los procesos operativos, la identificación de áreas de mejora en el consumo de energía y la adopción de tecnologías más eficientes. Esto puede incluir la modernización de equipos, la optimización de sistemas de calefacción y refrigeración, la mejora de la iluminación y la gestión más eficiente de los recursos energéticos.<br>
      Además de los beneficios ecológicos, la adopción de ISO 50001 trae consigo importantes ahorros económicos. Al mejorar la eficiencia energética, las empresas pueden reducir sus costos operativos a largo plazo, lo que les permite reinvertir en otras áreas estratégicas de la organización. La norma también ayuda a las empresas a evitar sanciones relacionadas con el consumo excesivo de energía y a cumplir con las regulaciones gubernamentales, lo que se traduce en un menor riesgo de multas y problemas legales.<br>
      La implementación de ISO 50001 también mejora la competitividad de las empresas en el mercado global. Cada vez más consumidores y socios comerciales buscan trabajar con empresas que demuestran su compromiso con la sostenibilidad y la eficiencia energética. Al obtener la certificación ISO 50001, las organizaciones pueden fortalecer su reputación como líderes en sostenibilidad y atraer nuevos clientes que valoran las prácticas responsables.<br>
      En resumen, la ISO 50001 no solo permite a las empresas optimizar su uso de la energía, sino que también les ayuda a reducir costos, mejorar su competitividad y contribuir a un futuro más sostenible.
      `.trim(),
      imagePath: 'assets/caratulas/imagen_noticias_recientes_4.svg',
      autor: 'Julián Herrera',
      avatarPath: 'assets/redactores/fotoretrado_redactor_4.svg',
      fecha: '10 Dic. 2024',
      categorias: ['Certificación y Normas Internacionales', 'Mejora Continua y Gestión de procesos', 'Sostenibilidad y Responsabilidad Corporativa'],
      etiquetas: ['Certificación ISO','Sostenibilidad','Gestión de calidad', 'Protección de Información'],
      likes: 21,
      comentarios:[{
        id: 0,
        autor: "Sofía López",
        texto: `ISO 50001 es una excelente manera de reducir costos y ser más sostenible. Además, mejora la competitividad al demostrar un compromiso con la eficiencia energética.`,
        fecha: '2025-02-15',
        respuestas:[]
      }]
    },
    {
      id: 4,
      titulo: 'ISO 27001 protege la información empresarial',
      texto: 'Con ISO 27001, las empresas protegen mejor su información digital.',
      cuerpo: `
      La gestión de la seguridad de la información se ha convertido en una prioridad para las empresas en un entorno digital cada vez más complejo y vulnerable a ciberataques. La norma ISO 27001 proporciona un marco internacionalmente reconocido para la implementación de sistemas de gestión de seguridad de la información (SGSI), con el objetivo de proteger los datos confidenciales y garantizar la continuidad del negocio. La adopción de esta norma ayuda a las organizaciones a identificar, evaluar y gestionar los riesgos relacionados con la seguridad de la información, al tiempo que asegura la confidencialidad, integridad y disponibilidad de los datos.<br>
      Implementar ISO 27001 implica un enfoque estructurado que abarca todos los aspectos de la seguridad de la información. Esto incluye la protección de los sistemas informáticos, redes, bases de datos y equipos, así como la capacitación de los empleados para que comprendan los riesgos asociados con la seguridad y adopten buenas prácticas para proteger la información. La norma también requiere que las organizaciones realicen auditorías periódicas, establezcan políticas claras y mantengan procedimientos para responder rápidamente a incidentes de seguridad.<br>
      Una de las ventajas más significativas de la implementación de ISO 27001 es que ayuda a las empresas a cumplir con las leyes y regulaciones de protección de datos, como el Reglamento General de Protección de Datos (GDPR) de la Unión Europea. Esto es especialmente importante en un momento donde las regulaciones sobre privacidad de datos se están volviendo más estrictas y las sanciones por incumplimiento son severas. Al contar con la certificación ISO 27001, las empresas demuestran su compromiso con la protección de la información y ganan la confianza de sus clientes y socios comerciales.<br>
      Además de los beneficios legales, la implementación de ISO 27001 también mejora la resiliencia organizacional. Al identificar y gestionar los riesgos de seguridad, las empresas pueden minimizar las probabilidades de sufrir brechas de seguridad que puedan dañar su reputación o interrumpir sus operaciones. Al hacerlo, las organizaciones no solo protegen sus activos más valiosos, sino que también aseguran la continuidad del negocio a largo plazo.<br>
      En resumen, la ISO 27001 es una inversión estratégica para proteger la información empresarial, cumplir con las normativas de privacidad de datos y garantizar la confianza de los clientes. Su implementación no solo mejora la seguridad digital, sino que también fortalece la posición competitiva de la empresa.
      `.trim(),
      imagePath: 'assets/caratulas/imagen_noticias_recientes_5.svg',
      autor: 'Fernando Aguirre',
      avatarPath: 'assets/redactores/fotoretrado_redactor_5.svg',
      fecha: '28 Feb. 2025',
      categorias: ['Certificación y Normas Internacionales', 'Mejora Continua y Gestión de procesos', 'Sostenibilidad y Responsabilidad Corporativa'],
      etiquetas: ['Certificación ISO','Sostenibilidad','Gestión de calidad', 'Protección de Información'],
      likes: 42,
      comentarios:[{
        id: 0,
        autor: "Ana Gonzáls",
        texto: `ISO 27001 es crucial para proteger la información, cumplir con regulaciones y mejorar la confianza de los clientes. Es una inversión clave para asegurar la continuidad del negocio y enfrentar ciberamenazas.`,
        fecha: '2025-04-21',
        respuestas:[]
      }]
    },
    {
      id: 5,
      titulo: 'Normas ISO abren puertas al comercio global',
      texto: 'Certificaciones ISO facilitan el acceso a mercados internacionales.',
      cuerpo: `
      Las certificaciones ISO han demostrado ser una herramienta poderosa para las empresas que buscan expandir su presencia en mercados internacionales. En un entorno globalizado, los consumidores y socios comerciales buscan organizaciones que cumplan con estándares internacionales de calidad, seguridad y sostenibilidad. Las normas ISO, como ISO 9001, ISO 14001, ISO 45001 y otras, proporcionan una base sólida para que las empresas demuestren su compromiso con la excelencia y la responsabilidad social en todos sus procesos operativos.<br>
      Contar con una certificación ISO ofrece una serie de ventajas competitivas para las empresas que desean entrar o expandirse en mercados internacionales. Estas certificaciones proporcionan una garantía de que los productos y servicios de la empresa cumplen con estándares globales, lo que facilita la entrada en nuevos mercados y mejora la relación con socios comerciales en otros países. Las empresas certificadas con normas ISO no solo aumentan su credibilidad y reputación, sino que también tienen la oportunidad de acceder a licitaciones y contratos con gobiernos y organizaciones internacionales que exigen altos estándares de calidad y cumplimiento normativo.<br>
      La implementación de normas ISO también ayuda a las empresas a cumplir con los requisitos legales y regulatorios en diferentes países, lo que les permite operar de manera más eficiente y con menor riesgo de enfrentar problemas legales. Además, las empresas que adoptan estas certificaciones son vistas como líderes en su industria, lo que les brinda una ventaja significativa frente a la competencia.<br>
      En conclusión, las normas ISO no solo mejoran la calidad y la eficiencia operativa dentro de las organizaciones, sino que también abren puertas a nuevas oportunidades de negocio en el ámbito global. Al cumplir con estos estándares internacionales, las empresas pueden posicionarse como actores clave en el comercio global y garantizar un futuro más exitoso y sostenible.
      `.trim(),
      imagePath: 'assets/caratulas/imagen_noticias_recientes_6.svg',
      autor: 'Matías Romero',
      avatarPath: 'assets/redactores/fotoretrado_redactor_6.svg',
      fecha: '15 Mar. 2025',
      categorias: ['Certificación y Normas Internacionales', 'Mejora Continua y Gestión de procesos', 'Sostenibilidad y Responsabilidad Corporativa'],
      etiquetas: ['Certificación ISO','Sostenibilidad','Gestión de calidad', 'Protección de Información'],
      likes: 42,
      comentarios:[{
        id: 0,
        autor: "Cynthia Morales",
        texto: `Las certificaciones ISO son clave para mejorar la competitividad y abrir puertas en mercados internacionales. Ayudan a las empresas a cumplir con estándares globales y ganar la confianza de socios y clientes.`,
        fecha: '2025-06-19',
        respuestas:[]
      }]
    }
  ];

  getAll(): Noticia[] {
    return this.noticias;
  }

  getById(i: number): Noticia | undefined {
    return this.noticias[i];
  }
}
