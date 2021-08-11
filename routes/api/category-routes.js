const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => { 
  
  Category.findAll({ 
    include:{ 
      model:Product, 
      attributes:['id','product_name','price','stock','category_id']
    }
  }) 
  .then(category =>{ 
    if(!category){ 
      res.status(404).json({message:"No category found here GoodBye!"}); 
      return;
    } 
    res.json(category);
  }) 
  .catch(err=>{ 
    console.log(err); 
    res.status(500).json(err)
  });
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => { 
  Category.findOne({ 
    where:{ 
      id:req.params.id
    }, 
    include:{ 
      model:Product, 
      attributes:['id','product_name','price','stock','category_id']
    }
  }) 
  .then(category =>{ 
    if(!category){ 
      res.status(404).json({message:"No category found here GoodBye!"}); 
      return;
    } 
    res.json(category);
  }) 
  .catch(err=>{ 
    console.log(err); 
    res.status(500).json(err)
  });
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => { 

  Category.create({ 
    category_name: req.body.category_name
  }) 
  .then(category => res.json(category)) 
  .catch(err=>{ 
    console.log(err); 
    res.status(500).json(err)
  });
  // create a new category
});

router.put('/:id', (req, res) => { 

  Category.update(req.body,{ 
    where:{ 
      id:req.params.id
    }
  }) 
  .then(category =>{ 
    if(!category){ 
      res.status(404).json({message:"No category with that id found here GoodBye!"}); 
      return;
    } 
    res.json(category);
  }) 
  .catch(err=>{ 
    console.log(err); 
    res.status(500).json(err)
  });
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => { 

  Category.destroy(req.body,{ 
    where:{ 
      id:req.params.id
    }
  }) 
  .then(category =>{ 
    if(!category){ 
      res.status(404).json({message:"No category with that id found here GoodBye!"}); 
      return;
    } 
    res.json(category);
  }) 
  .catch(err=>{ 
    console.log(err); 
    res.status(500).json(err)
  });
  // delete a category by its `id` value
});

module.exports = router;