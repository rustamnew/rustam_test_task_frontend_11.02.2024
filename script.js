/*Полученный ответ с сервера */
const data = {
    "services": [
        {
            "id": 1,
            "head": null,
            "name": "Проф.осмотр",
            "node": 0,
            "price": 100.0,
            "sorthead": 20
        },
        {
            "id": 2,
            "head": null,
            "name": "Хирургия",
            "node": 1,
            "price": 0.0,
            "sorthead": 10
        },
        {
            "id": 3,
            "head": 2,
            "name": "Удаление зубов",
            "node": 1,
            "price": 0.0,
            "sorthead": 10
        },
        {
            "id": 4,
            "head": 3,
            "name": "Удаление зуба",
            "node": 0,
            "price": 800.0,
            "sorthead": 10
        },
        {
            "id": 5,
            "head": 3,
            "name": "Удаление 8ого зуба",
            "node": 0,
            "price": 1000.0,
            "sorthead": 30
        },
        {
            "id": 6,
            "head": 3,
            "name": "Удаление осколка зуба",
            "node": 0,
            "price": 2000.0,
            "sorthead": 20
        },
        {
            "id": 7,
            "head": 2,
            "name": "Хирургические вмешательство",
            "node": 0,
            "price": 200.0,
            "sorthead": 10
        },
        {
            "id": 8,
            "head": 2,
            "name": "Имплантация зубов",
            "node": 1,
            "price": 0.0,
            "sorthead": 20
        },
        {
            "id": 9,
            "head": 8,
            "name": "Коронка",
            "node": 0,
            "price": 3000.0,
            "sorthead": 10
        },
        {
            "id": 10,
            "head": 8,
            "name": "Слепок челюсти",
            "node": 0,
            "price": 500.0,
            "sorthead": 20
        }
    ]
}

/* Старт */
renderTree(buildSortedArray(data.services))


/* Построение объекта */
function buildSortedArray(services) {
    services = services.sort(compareSorthead)
    
    const result = []
    
    services.forEach( (service) => {
        if (service.node === 1) {
            service.children = findChildNodes(service, services)
        } 
        if (service.head === null) {
            result.push(service)
        }
    })

    return result
}
function findChildNodes(obj, services) {

    const array = services.filter( (item) => {
        return item.head === obj.id
    })

    return array
}
function compareSorthead(a, b) {
    return a.sorthead - b.sorthead
}
/*END Построение объекта*/



/* Отрисовка списка на странице */
function renderTree(array) {
    const main_list = document.createElement('ul')

    array.forEach( (item) => {
        const li = createItem(item)

        main_list.appendChild(li)
    })
    
    document.body.appendChild(main_list)
}
function createItem(obj) {
    const li = document.createElement('li')
    const title = document.createElement('span')

    if (obj.price > 0) {
        title.innerHTML = `${obj.name} (${obj.price})`
    } else {
        title.innerHTML = obj.name
    }
    

    li.appendChild(title)

    if (obj.children) {
        const ul = createList(obj.children)
        li.appendChild(ul)

        const button = createExpandButton() 
        title.appendChild(button)
    }

    return li
}
function createList(array) {
    const ul = document.createElement('ul')

    array.forEach( (item) => {
        const li = createItem(item)
        ul.appendChild(li)
    })

    return ul
}
function createExpandButton() {
    const button = document.createElement('button')
    button.classList.add('expand-button')
    button.addEventListener('click', (e) => {
        e.preventDefault()
        e.target.closest('li').classList.toggle('active')
    })

    return button
}
/*END Отрисовка списка на странице*/

