import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const createSeed = prisma.user.create({
    data: {
      email: `test@test.te`,
      firstname: 'Alice',
      role: 'USER',
      password: '$2b$10$LrOtst8wTU7y//5HEATve.hdih3D8fuiXvN2WZHpQPDutI3WInwL2', //password
      trees: {
        create: {
          name: 'Gordeeva',
          nodes: {
            create: [
              {
                id: 'ckl43z76h0000qdnaa5xycvs8',
                firstname: 'Павел Матора',
                description: '1850 c. Горбунки',
                children: {
                  connect: [
                    { id: 'ckl43z76h0001qdnaflgvgqwb' },
                    { id: 'ckl43z76i002bqdna2ducfdfo' },
                    { id: 'ckl43z76i002cqdna4l9gdi16' },
                    { id: 'ckl43z76i002dqdnadelkh8n3' },
                    { id: 'ckl43z76i002yqdnaddyjcl4c' },
                  ],
                },
              },
              {
                id: 'ckl43z76h0001qdnaflgvgqwb',
                firstname: 'Илья',
                children: {
                  connect: [
                    { id: 'ckl43z76h0002qdna1ozdawg5' },
                    { id: 'ckl43z76h0003qdna6swm2au6' },
                    { id: 'ckl43z76h0004qdna2u4wb488' },
                    { id: 'ckl43z76h0005qdnadurca28o' },
                    { id: 'ckl43z76h0006qdna1ytt7nkp' },
                    { id: 'ckl43z76h0007qdnads7nabu2' },
                  ],
                },
              },
              {
                id: 'ckl43z76h0002qdna1ozdawg5',
                firstname: 'Мария',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76h0003qdna6swm2au6',
                firstname: 'Фрося',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76h0004qdna2u4wb488',
                firstname: 'Анна',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76h0005qdnadurca28o',
                firstname: 'Василий',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76h0006qdna1ytt7nkp',
                firstname: 'Иван',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76h0007qdnads7nabu2',
                firstname: 'Грегорий',
                description: '1876-1918',
                children: {
                  connect: [
                    { id: 'ckl43z76h0009qdna5o5770py' },
                    { id: 'ckl43z76h0010qdnabj7g0pgb' },
                    { id: 'ckl43z76h0011qdna47qdeqkc' },
                    { id: 'ckl43z76h0013qdna5bkqebhf' },
                    { id: 'ckl43z76h0015qdna2hze1m8w' },
                    { id: 'ckl43z76i001hqdna97orday3' },
                    { id: 'ckl43z76i001iqdnaf73f1983' },
                    { id: 'ckl43z76i001kqdna3pno22rk' },
                    { id: 'ckl43z76i001rqdnab3x0ca53' },
                  ],
                },
              },
              {
                id: 'ckl43z76h0008qdna17v553nv',
                firstname: 'Анна Ильинична Салазко',
                description: '1880-1918',
                children: {
                  connect: [
                    { id: 'ckl43z76h0009qdna5o5770py' },
                    { id: 'ckl43z76h0010qdnabj7g0pgb' },
                    { id: 'ckl43z76h0011qdna47qdeqkc' },
                    { id: 'ckl43z76h0013qdna5bkqebhf' },
                    { id: 'ckl43z76h0015qdna2hze1m8w' },
                    { id: 'ckl43z76i001hqdna97orday3' },
                    { id: 'ckl43z76i001iqdnaf73f1983' },
                    { id: 'ckl43z76i001kqdna3pno22rk' },
                    { id: 'ckl43z76i001rqdnab3x0ca53' },
                  ],
                },
              },
              {
                id: 'ckl43z76h0009qdna5o5770py',
                firstname: 'Наталья',
                children: {
                  connect: [
                    { id: 'ckl43z76h000bqdna4vmc31qh' },
                    { id: 'ckl43z76h000iqdnagqhkgedu' },
                    { id: 'ckl43z76h000lqdnaan997xmn' },
                    { id: 'ckl43z76h000mqdna9xksayik' },
                    { id: 'ckl43z76h000nqdna0l4mfe3g' },
                    { id: 'ckl43z76h000oqdnafmh7c33d' },
                    { id: 'ckl43z76h000pqdnah9fd3vhm' },
                    { id: 'ckl43z76h000zqdna8do6g1u9' },
                  ],
                },
              },
              {
                id: 'ckl43z76h000aqdna94n03o1l',
                firstname: 'Александр Чичаевы',
                description: '1899-1981',
                children: {
                  connect: [
                    { id: 'ckl43z76h000bqdna4vmc31qh' },
                    { id: 'ckl43z76h000iqdnagqhkgedu' },
                    { id: 'ckl43z76h000lqdnaan997xmn' },
                    { id: 'ckl43z76h000mqdna9xksayik' },
                    { id: 'ckl43z76h000nqdna0l4mfe3g' },
                    { id: 'ckl43z76h000oqdnafmh7c33d' },
                    { id: 'ckl43z76h000pqdnah9fd3vhm' },
                    { id: 'ckl43z76h000zqdna8do6g1u9' },
                  ],
                },
              },
              {
                id: 'ckl43z76h000bqdna4vmc31qh',
                firstname: 'Зинаида',
                description: '1922-2001 Самара',
                children: { connect: [{ id: 'ckl43z76h000dqdna93mg2qkp' }] },
              },
              {
                id: 'ckl43z76h000cqdnagh2hd5eq',
                firstname: 'Михаил Борисовы',
                children: { connect: [{ id: 'ckl43z76h000dqdna93mg2qkp' }] },
              },
              {
                id: 'ckl43z76h000dqdna93mg2qkp',
                firstname: 'Татьяна',
                description: '1955',
                children: {
                  connect: [
                    { id: 'ckl43z76h000fqdna9jnzha58' },
                    { id: 'ckl43z76h000gqdnad9je35gn' },
                    { id: 'ckl43z76h000hqdna82xwcwmf' },
                  ],
                },
              },
              {
                id: 'ckl43z76h000eqdna8e2d52vw',
                firstname: 'Александр Остроуховы',
                children: {
                  connect: [
                    { id: 'ckl43z76h000fqdna9jnzha58' },
                    { id: 'ckl43z76h000gqdnad9je35gn' },
                    { id: 'ckl43z76h000hqdna82xwcwmf' },
                  ],
                },
              },
              {
                id: 'ckl43z76h000fqdna9jnzha58',
                firstname: 'Александра',
                description: '1980',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76h000gqdnad9je35gn',
                firstname: 'Наталья',
                description: '1983',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76h000hqdna82xwcwmf',
                firstname: 'Мария',
                description: '1997',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76h000iqdnagqhkgedu',
                firstname: 'Александра',
                description: '1923-2001 Самара',
                children: { connect: [{ id: 'ckl43z76h000kqdna1an1dcqa' }] },
              },
              {
                id: 'ckl43z76h000jqdnaa93wgf8g',
                firstname: 'Николай Федоровы',
                children: { connect: [{ id: 'ckl43z76h000kqdna1an1dcqa' }] },
              },
              {
                id: 'ckl43z76h000kqdna1an1dcqa',
                firstname: 'Андрей',
                description: '1961 Самара',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76h000lqdnaan997xmn',
                firstname: 'Галина',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76h000mqdna9xksayik',
                firstname: 'Геннадий',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76h000nqdna0l4mfe3g',
                firstname: 'Вячеслав',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76h000oqdnafmh7c33d',
                firstname: 'Александр',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76h000pqdnah9fd3vhm',
                firstname: 'Октябрина',
                description: '1938 Самара',
                children: {
                  connect: [
                    { id: 'ckl43z76h000rqdna744qfcym' },
                    { id: 'ckl43z76h000vqdnafg9p5x66' },
                  ],
                },
              },
              {
                id: 'ckl43z76h000qqdnad1r2gjwl',
                firstname: 'Александр Гордеевы',
                children: {
                  connect: [
                    { id: 'ckl43z76h000rqdna744qfcym' },
                    { id: 'ckl43z76h000vqdnafg9p5x66' },
                  ],
                },
              },
              {
                id: 'ckl43z76h000rqdna744qfcym',
                firstname: 'Евгения',
                description: '1948',
                children: {
                  connect: [
                    { id: 'ckl43z76h000tqdnagb896b4i' },
                    { id: 'ckl43z76h000uqdnacsdz5vm2' },
                  ],
                },
              },
              {
                id: 'ckl43z76h000sqdna3pai18ro',
                firstname: 'Владимир Клементьевы',
                children: {
                  connect: [
                    { id: 'ckl43z76h000tqdnagb896b4i' },
                    { id: 'ckl43z76h000uqdnacsdz5vm2' },
                  ],
                },
              },
              {
                id: 'ckl43z76h000tqdnagb896b4i',
                firstname: 'Мари',
                description: '1992',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76h000uqdnacsdz5vm2',
                firstname: 'Анастасия',
                description: '1992',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76h000vqdnafg9p5x66',
                firstname: 'Галина',
                description: '1969',
                children: {
                  connect: [
                    { id: 'ckl43z76h000xqdnaecfdd2r3' },
                    { id: 'ckl43z76h000yqdnadwoy7wvm' },
                  ],
                },
              },
              {
                id: 'ckl43z76h000wqdnafjaf00fj',
                firstname: 'Дмитрий Головы',
                children: {
                  connect: [
                    { id: 'ckl43z76h000xqdnaecfdd2r3' },
                    { id: 'ckl43z76h000yqdnadwoy7wvm' },
                  ],
                },
              },
              {
                id: 'ckl43z76h000xqdnaecfdd2r3',
                firstname: 'Дарья',
                description: '1998',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76h000yqdnadwoy7wvm',
                firstname: 'Василий',
                description: '2011',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76h000zqdna8do6g1u9',
                firstname: 'Лидия',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76h0010qdnabj7g0pgb',
                firstname: 'Дмитрий',
                description: '1901-1943',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76h0011qdna47qdeqkc',
                firstname: 'Ефросинья',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76h0012qdna4zaq03ow',
                firstname: 'Василий Яковлевы',
                description: '1903-1981',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76h0013qdna5bkqebhf',
                firstname: 'Александр',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76h0014qdnafnujdjlx',
                firstname: 'Софья Моторовы',
                description: '1904-1979',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76h0015qdna2hze1m8w',
                firstname: 'Пелагея',
                children: { connect: [{ id: 'ckl43z76i0017qdna2t9yft49' }] },
              },
              {
                id: 'ckl43z76i0016qdna7kjsafes',
                firstname: 'Ануфрий Рогоза',
                children: { connect: [{ id: 'ckl43z76i0017qdna2t9yft49' }] },
              },
              {
                id: 'ckl43z76i0017qdna2t9yft49',
                firstname: 'Валентина',
                children: {
                  connect: [
                    { id: 'ckl43z76i0019qdnad3t7hs5y' },
                    { id: 'ckl43z76i001aqdnabrkv7owc' },
                    { id: 'ckl43z76i001bqdnahoi076iv' },
                  ],
                },
              },
              {
                id: 'ckl43z76i0018qdna0969052m',
                firstname: 'Сергей Прилягины',
                description: '1946',
                children: {
                  connect: [
                    { id: 'ckl43z76i0019qdnad3t7hs5y' },
                    { id: 'ckl43z76i001aqdnabrkv7owc' },
                    { id: 'ckl43z76i001bqdnahoi076iv' },
                  ],
                },
              },
              {
                id: 'ckl43z76i0019qdnad3t7hs5y',
                firstname: 'Екатерина',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i001aqdnabrkv7owc',
                firstname: 'Елена',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i001bqdnahoi076iv',
                firstname: 'Александр',
                description: '1944',
                children: {
                  connect: [
                    { id: 'ckl43z76i001dqdna3ka6beyj' },
                    { id: 'ckl43z76i001gqdna7mhogf7v' },
                  ],
                },
              },
              {
                id: 'ckl43z76i001cqdna852y607x',
                firstname: 'Светлана Прилягины',
                description: '1945',
                children: {
                  connect: [
                    { id: 'ckl43z76i001dqdna3ka6beyj' },
                    { id: 'ckl43z76i001gqdna7mhogf7v' },
                  ],
                },
              },
              {
                id: 'ckl43z76i001dqdna3ka6beyj',
                firstname: 'Павел',
                description: '1969-1996',
                children: {
                  connect: [
                    { id: 'ckl43z76i001eqdna57pbgshz' },
                    { id: 'ckl43z76i001fqdna7rec10t9' },
                  ],
                },
              },
              {
                id: 'ckl43z76i001eqdna57pbgshz',
                firstname: 'Дария',
                description: '1992',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i001fqdna7rec10t9',
                firstname: 'Анна',
                description: '1995',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i001gqdna7mhogf7v',
                firstname: 'Анастасия',
                description: '1974-1996',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i001hqdna97orday3',
                firstname: 'Екатерина',
                description: '1909-1945',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i001iqdnaf73f1983',
                firstname: 'Елена',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i001jqdnac87z85tz',
                firstname: 'Иван Андрасюк',
                description: '1912-1984',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i001kqdna3pno22rk',
                firstname: 'Евгения',
                children: { connect: [{ id: 'ckl43z76i001mqdna5fybe45z' }] },
              },
              {
                id: 'ckl43z76i001lqdnafxy216xg',
                firstname: 'Леонид Матора',
                description: '1912-1984',
                children: { connect: [{ id: 'ckl43z76i001mqdna5fybe45z' }] },
              },
              {
                id: 'ckl43z76i001mqdna5fybe45z',
                firstname: 'Ирина',
                children: { connect: [{ id: 'ckl43z76i001oqdna3tbl9op9' }] },
              },
              {
                id: 'ckl43z76i001nqdnac3cybkb3',
                firstname: 'Анатолий Рогаза',
                description: '1946-',
                children: { connect: [{ id: 'ckl43z76i001oqdna3tbl9op9' }] },
              },
              {
                id: 'ckl43z76i001oqdna3tbl9op9',
                firstname: 'Елена',
                children: { connect: [{ id: 'ckl43z76i001qqdna95wr2efa' }] },
              },
              {
                id: 'ckl43z76i001pqdna1tlc7je7',
                firstname: 'Дмитрий',
                description: '1972',
                children: { connect: [{ id: 'ckl43z76i001qqdna95wr2efa' }] },
              },
              {
                id: 'ckl43z76i001qqdna95wr2efa',
                firstname: 'Александр',
                description: '1996-2005',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i001rqdnab3x0ca53',
                firstname: 'Никифор',
                description: '1917-1998',
                children: {
                  connect: [
                    { id: 'ckl43z76i001tqdna0btp7sz0' },
                    { id: 'ckl43z76i001xqdna2neifjue' },
                    { id: 'ckl43z76i001yqdna9j4w3t2d' },
                  ],
                },
              },
              {
                id: 'ckl43z76i001sqdnaglwkfzip',
                firstname: 'Нина Матора',
                description: '1918-2004',
                children: {
                  connect: [
                    { id: 'ckl43z76i001tqdna0btp7sz0' },
                    { id: 'ckl43z76i001xqdna2neifjue' },
                    { id: 'ckl43z76i001yqdna9j4w3t2d' },
                  ],
                },
              },
              {
                id: 'ckl43z76i001tqdna0btp7sz0',
                firstname: 'Владимир',
                children: { connect: [{ id: 'ckl43z76i001vqdnagrc95gdm' }] },
              },
              {
                id: 'ckl43z76i001uqdnaekpn7qhn',
                firstname: 'Нина Матора',
                description: '1939-2000',
                children: { connect: [{ id: 'ckl43z76i001vqdnagrc95gdm' }] },
              },
              {
                id: 'ckl43z76i001vqdnagrc95gdm',
                firstname: 'Екатерина',
                description: '1972',
                children: { connect: [{ id: 'ckl43z76i001wqdna4dxief67' }] },
              },
              {
                id: 'ckl43z76i001wqdna4dxief67',
                firstname: 'Алеша',
                description: '2006',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i001xqdna2neifjue',
                firstname: 'Майя',
                description: '1941-1944',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i001yqdna9j4w3t2d',
                firstname: 'Анатолий',
                children: {
                  connect: [
                    { id: 'ckl43z76i0020qdna81k23idd' },
                    { id: 'ckl43z76i0024qdnaa28i8e03' },
                    { id: 'ckl43z76i0027qdna0i5ifz56' },
                  ],
                },
              },
              {
                id: 'ckl43z76i001zqdnac00ucj13',
                firstname: 'Галина Мотора',
                description: '1946',
                children: {
                  connect: [
                    { id: 'ckl43z76i0020qdna81k23idd' },
                    { id: 'ckl43z76i0024qdnaa28i8e03' },
                    { id: 'ckl43z76i0027qdna0i5ifz56' },
                  ],
                },
              },
              {
                id: 'ckl43z76i0020qdna81k23idd',
                firstname: 'Георгий',
                description: '1969',
                children: {
                  connect: [
                    { id: 'ckl43z76i0022qdnah26y1z04' },
                    { id: 'ckl43z76i0023qdnah48o1gud' },
                  ],
                },
              },
              {
                id: 'ckl43z76i0021qdnae9m64ree',
                firstname: 'Елена Мотора',
                description: '1971',
                children: {
                  connect: [
                    { id: 'ckl43z76i0022qdnah26y1z04' },
                    { id: 'ckl43z76i0023qdnah48o1gud' },
                  ],
                },
              },
              {
                id: 'ckl43z76i0022qdnah26y1z04',
                firstname: 'Рита',
                description: '1997',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i0023qdnah48o1gud',
                firstname: 'Анастасия',
                description: '2006',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i0024qdnaa28i8e03',
                firstname: 'Татьяна',
                description: '1972',
                children: {
                  connect: [
                    { id: 'ckl43z76i0025qdna9j6s44p3' },
                    { id: 'ckl43z76i0026qdnae49lf8pg' },
                  ],
                },
              },
              {
                id: 'ckl43z76i0025qdna9j6s44p3',
                firstname: 'Дарья',
                description: '1999',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i0026qdnae49lf8pg',
                firstname: 'Иван',
                description: '2006',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i0027qdna0i5ifz56',
                firstname: 'Нина',
                description: '1979',
                children: {
                  connect: [
                    { id: 'ckl43z76i0029qdna68jig348' },
                    { id: 'ckl43z76i002aqdna8p0p8r80' },
                  ],
                },
              },
              {
                id: 'ckl43z76i0028qdna133ehs19',
                firstname: 'Максим Богомаз',
                description: '1976',
                children: {
                  connect: [
                    { id: 'ckl43z76i0029qdna68jig348' },
                    { id: 'ckl43z76i002aqdna8p0p8r80' },
                  ],
                },
              },
              {
                id: 'ckl43z76i0029qdna68jig348',
                firstname: 'Екатерина',
                description: '2010',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i002aqdna8p0p8r80',
                firstname: 'Вера',
                description: '2014',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i002bqdna2ducfdfo',
                firstname: 'Григорий',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i002cqdna4l9gdi16',
                firstname: 'Егор',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i002dqdnadelkh8n3',
                firstname: 'Борис',
                children: {
                  connect: [
                    { id: 'ckl43z76i002eqdna6vled2ol' },
                    { id: 'ckl43z76i002hqdnahmdydt6x' },
                    { id: 'ckl43z76i002oqdnacwsxgxg1' },
                  ],
                },
              },
              {
                id: 'ckl43z76i002eqdna6vled2ol',
                firstname: 'Пелагея',
                children: { connect: [{ id: 'ckl43z76i002fqdna0wag5136' }] },
              },
              {
                id: 'ckl43z76i002fqdna0wag5136',
                firstname: 'Таисия Сакки',
                children: { connect: [{ id: 'ckl43z76i002gqdnaeirb3fqf' }] },
              },
              {
                id: 'ckl43z76i002gqdnaeirb3fqf',
                firstname: 'Татьяна',
                description: 'Севастополь',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i002hqdnahmdydt6x',
                firstname: 'Марина',
                children: {
                  connect: [
                    { id: 'ckl43z76i002iqdna3sfq61u0' },
                    { id: 'ckl43z76i002kqdna3rfa152f' },
                    { id: 'ckl43z76i002mqdnaeayxa6fe' },
                  ],
                },
              },
              {
                id: 'ckl43z76i002iqdna3sfq61u0',
                firstname: 'Раиса',
                children: { connect: [{ id: 'ckl43z76i002jqdna5ouh5q8q' }] },
              },
              {
                id: 'ckl43z76i002jqdna5ouh5q8q',
                firstname: 'Сын',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i002kqdna3rfa152f',
                firstname: 'Зинаида',
                children: { connect: [{ id: 'ckl43z76i002lqdna737a5jaq' }] },
              },
              {
                id: 'ckl43z76i002lqdna737a5jaq',
                firstname: '5 детей',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i002mqdnaeayxa6fe',
                firstname: 'Виктор',
                children: { connect: [{ id: 'ckl43z76i002nqdnagrk7937h' }] },
              },
              {
                id: 'ckl43z76i002nqdnagrk7937h',
                firstname: '2 ребенка',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i002oqdnacwsxgxg1',
                firstname: 'Марфа',
                description: '1952',
                children: {
                  connect: [
                    { id: 'ckl43z76i002qqdna6sz47hde' },
                    { id: 'ckl43z76i002rqdna9hx4530p' },
                    { id: 'ckl43z76i002tqdnafq1pgtxv' },
                    { id: 'ckl43z76i002uqdna5gewf73m' },
                    { id: 'ckl43z76i002vqdna4pr6bugx' },
                    { id: 'ckl43z76i002wqdna4y7b9nap' },
                    { id: 'ckl43z76i002xqdna1vtacg15' },
                  ],
                },
              },
              {
                id: 'ckl43z76i002pqdna5ec7e4nr',
                firstname: 'Дмитрий Салазко',
                description: '1947',
                children: {
                  connect: [
                    { id: 'ckl43z76i002qqdna6sz47hde' },
                    { id: 'ckl43z76i002rqdna9hx4530p' },
                    { id: 'ckl43z76i002tqdnafq1pgtxv' },
                    { id: 'ckl43z76i002uqdna5gewf73m' },
                    { id: 'ckl43z76i002vqdna4pr6bugx' },
                    { id: 'ckl43z76i002wqdna4y7b9nap' },
                    { id: 'ckl43z76i002xqdna1vtacg15' },
                  ],
                },
              },
              {
                id: 'ckl43z76i002qqdna6sz47hde',
                firstname: 'Иван',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i002rqdna9hx4530p',
                firstname: 'Нина',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i002sqdnac5hn8wio',
                firstname: 'Нинакор Вязянко',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i002tqdnafq1pgtxv',
                firstname: 'Виктория',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i002uqdna5gewf73m',
                firstname: 'Петр',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i002vqdna4pr6bugx',
                firstname: 'Лидия',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i002wqdna4y7b9nap',
                firstname: 'Валентина',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i002xqdna1vtacg15',
                firstname: 'Ольга',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i002yqdnaddyjcl4c',
                firstname: 'Петр',
                children: { connect: [{ id: 'ckl43z76i002zqdna35ee1oh2' }] },
              },
              {
                id: 'ckl43z76i002zqdna35ee1oh2',
                firstname: 'Евдокия',
                children: {
                  connect: [
                    { id: 'ckl43z76i0031qdnaciyu1x58' },
                    { id: 'ckl43z76i0033qdnagpt4etxq' },
                    { id: 'ckl43z76i0034qdna3kg94id5' },
                  ],
                },
              },
              {
                id: 'ckl43z76i0030qdnaabcxbm7e',
                firstname: 'Александр Прохоренко',
                description: 'Ушково',
                children: {
                  connect: [
                    { id: 'ckl43z76i0031qdnaciyu1x58' },
                    { id: 'ckl43z76i0033qdnagpt4etxq' },
                    { id: 'ckl43z76i0034qdna3kg94id5' },
                  ],
                },
              },
              {
                id: 'ckl43z76i0031qdnaciyu1x58',
                firstname: 'Вадим',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i0032qdna3n1t2wr5',
                firstname: 'Людмила',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i0033qdnagpt4etxq',
                firstname: 'Нина',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i0034qdna3kg94id5',
                firstname: 'Валентина',
                children: {
                  connect: [
                    { id: 'ckl43z76i0035qdnagy6gbsgp' },
                    { id: 'ckl43z76i0036qdna455me1yy' },
                  ],
                },
              },
              {
                id: 'ckl43z76i0035qdnagy6gbsgp',
                firstname: 'Юра',
                children: { connect: [] },
              },
              {
                id: 'ckl43z76i0036qdna455me1yy',
                firstname: 'Зоя',
                children: { connect: [] },
              },
            ].reverse(),
          },
        },
      },
    },
  });

  await prisma.$transaction([createSeed]);
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
