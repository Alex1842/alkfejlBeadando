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
            console.log('doCreate -->FAIL');
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
            console.log('addCategory -->FAIL');
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

    * view(request, response) {
        console.log('view');
        const categories = yield Category.all()
        const id = request.param('id');
        const critic = yield Critic.find(id);
        yield critic.related('category').load();
        yield response.sendView('viewCritic', {
            critic: critic.toJSON(),
            categories: categories.toJSON()
        })
    }

    * doView(request, response) {
        console.log('doview');
        const criticData = request.except('_csrf');
        const rules = {
            title: 'required',
            category_id: 'required',
            description: 'required'
        };
        const validation = yield Validator.validateAll(criticData, rules);
        if (validation.fails()) {
            console.log('doView -->FAIL');
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
        critic.description = request.input('description');
        yield critic.save();
        response.redirect('/critics');
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
            description: 'required'
        };
        const validation = yield Validator.validateAll(criticData, rules);
        if (validation.fails()) {
            console.log('doEdit -->FAIL');
            response.send({error: validation.messages()})
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()
            response.redirect('back');
            return
        }
        const id = request.param('id');
        const critic = yield Critic.find(id);      
        critic.description = request.input('description');
        yield critic.save();
        response.redirect('/viewCritic/'+request.param('id'));
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
        yield category.delete();
    
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

    * search (request, response) {
const page = Math.max(1, request.input('p'))
const filters = {
critic: request.input('critic') || '',
category: request.input('category') || 0

}
const recipes = yield Critic.query()
.where(function () {
if (filters.category > 0) this.where('category_id', filters.category)
if (filters.critic.length > 0) this.where('critic', 'LIKE', `%${filters.name}%`)
})
.with('user')
.paginate(page, 9)
const categories = yield Category.all()
const users = yield User.all()
yield response.sendView('criticSearch', {
critic: critic.toJSON(),
categories: categories.toJSON(),
filters
})
}
}

module.exports = CriticsController
