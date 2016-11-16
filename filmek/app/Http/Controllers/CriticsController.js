'use strict'
const Database = use('Database')
const Category = use('App/Model/Category')
const Critic = use('App/Model/Critic')
const Validator = use('Validator')

class CriticsController {

    * create(request, response) {
        console.log('create');
        const categories = yield Category.all()          
        const critics = yield Critic.all()

        
        yield response.sendView('createCritic', {
            categories: categories.toJSON(),
            critics : critics.toJSON()
        });


    }

    * doCreate(request, response) {
      
      
        const criticData = request.except('_csrf');
        console.log("############")
        console.log(criticData);
        const rules = {
            title: 'required',
            category_id: 'required',
            description: 'required'
        };
        const validation = yield Validator.validateAll(criticData, rules);

        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()
            response.redirect('back');
            return
        }
        criticData.user_id = request.currentUser.id;
        const critic = yield Critic.create(criticData);
        response.redirect('/critics');
    }

    * addCategory(request, response) {
        const categoryData = request.except('_csrf');
        const rules = {
            name: 'required'
        }
        const validation = yield Validator.validateAll(categoryData, rules);

        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()
            response.redirect('back');
            return
        }
        categoryData.user_id = request.currentUser.id;
        const category = yield Category.create(categoryData);
        response.redirect('/createCritic');
    }

    * edit(request, response) {

        console.log('edit');

        const categories = yield Category.all()
        const id = request.param('id');
        const critic = yield Critic.find(id);
        yield critic.related('category').load();
        yield response.sendView('editCritic', {
            critic: critic.toJSON(),
            categories: categories.toJSON()
        })
    }

    * doEdit(request, response) {
        console.log('doedit');
        const criticData = request.except('_csrf');

        const rules = {
            title: 'required',
            category_id: 'required'
        };
        const validation = yield Validator.validateAll(criticData, rules);

        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()
            response.redirect('back');
            return
        }

        const id = request.param('id');
        const critic = yield Critic.find(id);
        critic.title = request.input('title');
        critic.category_id = request.input('category_id');
        yield critic.save();
        response.redirect('/critics');
    }

    * delete(request, response) {
        const id = request.param('id');
        const critic = yield Critic.find(id);

        yield critic.delete();
        response.redirect('/critics');
    }

    * deleteCategory(request, response) {
        const id = request.param('id');
        const category = yield Category.find(id);
        const critics = yield category.critics().fetch();

        // for(var i=critics.length; i = 0 ; --i){
        //     critics.splice(i,1);
        // }

        // yield category.delete(critics);
        yield category.delete();
        // console.log(critics.length);
        response.redirect('/critics');
    }

    * editCategory(request, response) {
        const categoryData = request.except('_csrf');

        const rules = {
            name: 'required',
        };
        const validation = yield Validator.validateAll(categoryData, rules);

        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()
            response.redirect('back');
            return
        }

        const id = request.param('id');
        const category = yield Category.find(id);
        category.name = categoryData.name;
        console.log(category.name);
        yield category.save();
        response.redirect('/critics');
    }
}

module.exports = CriticsController
