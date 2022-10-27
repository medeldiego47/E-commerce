const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes:['id','category_name'],
    include :[
     { model: Product,
      attributes:['id','product_name','price']
  }]
  }).then((categories)=> 
  res.json(categories)).catch(err=>{
    res.json(500).json(err);
    throw (err);

  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where:{
      id:req.params.id
    },
    attributes:['category_name','id'],
    include:[
      {model:Product,
      attributes:['id','product_name','price']}
    ]
  }).then(result=>{
    if (!result){
      res.status(404).json({message: `id does not match any category`});
      return;
    } else {res.json(result)};
  }).catch((err)=> {
    res.status(500).json(err);
    throw(err)
  })
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  }).then(results=> 
    res.json(results)).catch((err)=> {
       res.status(500).json(err);
      throw(err)})
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
