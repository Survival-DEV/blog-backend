### :dart:  What is been done in this PR:
**endpoint** : `api/categories`
- [x] adjust the M:N relation for BlogCategory schemas to be in a clousre format 
- [x] Refactor the code
- [x] re-arrange the files structure as in the section below.
- [x] create migrations for the schema
- [x] create a dummy data using Faker for Cat schema

**Note**: Initial queries have been made to join blogs & categories tables. currently, they work partially, but we need to go through them again in the next sprint.


**Relates to #9**

----
### Output Response:
 > 
 ```json
{
      {
        "id": "abf0b43d-365d-4f1e-9efc-a241557c462e",
        "title": "security",
        "meta_title": "security blogs",
        "slug": "/hack",
    }
}
 ```

 -----
### Files Structure:
> 
```json
    src/
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── blogs
│   ├── blogs.controller.ts
│   ├── blogs.module.ts
│   ├── blogs.service.ts
│   ├── dto
│   │   ├── create-blog.dto.ts
│   │   └── update-blog.dto.ts
│   └── interface
│       └── blog.interface.ts
├── constants
│   ├── errors.ts
│   └── index.ts
├── database
│   ├── entities
│   │   ├── blog-category.entity.ts
│   │   ├── blog.entity.ts
│   │   ├── category.entity.ts
│   │   ├── tag.entity.ts
│   │   └── user.entity.ts
│   ├── factories
│   │   └── category.factory.ts
│   ├── migrations
│   │   ├── 1624991187241-InitMigration.ts
│   │   └── 1624997421537-CategoryMigration.ts
│   └── seeds
│       └── category.seed.ts
├── main.ts
├── test
│   ├── app.controller.spec.ts
│   ├── app.e2e-spec.ts
│   ├── blogs
│   │   ├── blogs.controller.spec.ts
│   │   └── blogs.service.spec.ts
│   ├── jest-e2e.json

```  
 

### :compass:  How to test it
Steps to test my PR:
1. `npm ci`
2. make sure to setup your `DATABASE_URL` in your `.env` file
3. `npm run migration:up`
4. `npm run seed:config`
5. `npm run seed:run`
6. `nest start`
4. the active routes are-with their CRUD ops- :
   - `api/blogs` or `api/blogs:id`
   - `api/categories` or `api/categories/:id`
