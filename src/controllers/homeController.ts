import { Request, Response } from 'express';
import { Op } from 'sequelize';

import { sequelize } from '../instances/mysql';

import { Product } from '../models/Product';
import { User } from '../models/User';

export const home = async (req: Request, res: Response)=>{
let searchName: string = 'ko';

    let users = await User.findAll({
        //attributes: {exclude: 'name'} -> excluir algo da busca
        //where: { age: '30', name: 'Noah' } //-> filtragem
        //where: { age: [18, 90, 20]} //-> filtragem com + de 1 dado
        
        /* 
        //ORDENANDO RESULTADOS
        where: {
            age: { 
                [Op.gte]: 18
            }
        }, 
        order: [
            ['age', 'name']
            //'name'
        ]
        */

        //LIMITANDO RESULTADOS
        where: {
            age: { 
                [Op.gte]: 18
            }
        }, 
        offset: 3, //pula 3
        limit: 4 //limita a pesquisa
        /*
        -->>>PARA MOSTRAR POR PÁGINAS É SÓ USAR O SISTEMA DE PULAR PÁGINAS(offset) E AJUSTAR O LIMITE DE EXIBIÇÃO(limit)
        */
       
        /*
        //UTILIZANDO UMA VARIÁVEL PARA PESQUISA POR APENAS 2 CARAC.
        where: {
            name: {
                [Op.like]: `%${searchName}%`
                //[Op.like]: `ko`
            }
            /* 
            age:{ 
                [Op.gte]: 20, // > 40
                [Op.lt]: 35
                //[Op.notIn]: [ 20, 55 ] // != 20 e 55
                //[Op.gte]: 40, // >= 40
                //[Op.lt]: 40, // < 40
                //[Op.lte]: 40, // <-40
            }

            //filtragem de pesquisa OU
            /* 
            [Op.or]: [
                { age: 18},
                { name: 'Drake'}
            ]
        }
        */
    });
    

    // Testando se a conexão está funcionando
    try {
        await sequelize.authenticate()
        console.log("Conexão estabelecida com sucesso!")
    } catch(error) {
        console.log("Deu problema: ", error)
    }
    let age: number = 90;
    let showOld: boolean = false;

    if(age > 50) {
        showOld = true;
    }

    let list = Product.getAll();
    let expensiveList = Product.getFromPriceAfter(12);

    res.render('pages/home', {
        name: 'Bonieky',
        lastName: 'Lacerda',
        showOld,
        products: list,
        expensives: expensiveList,
        frasesDoDia: [],
        users
    });
};