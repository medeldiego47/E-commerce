const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include:[
      {
      model: Product, 
      attributes: ['id', 'product_name','price' ]
    
    }
  ]
  })
  .then((results) => res.json(results))
  .catch(err => {
   
    res.status(500).json(err);
    throw (err);
  });
  
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where:{
      id:req.params.id
    },
    attributes:['id','tag_name'],
    include:[
      {model:Product,
      attributes:['id','product_name','price']}
    ]
  }).then(result=>{
    if (!result){
      res.status(404).json({message: `id does not match any tag`});
      return;
    } else {res.json(result)};
  }).catch((err)=> {
    res.status(500).json(err);
    throw(err)
  })

});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  }).then((results)=> res.json(results)).catch((err)=>{
    res.status(500).json(err);
    throw(err)
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where:{
        id:req.params.id
      }
    }
  ).then(results=>{
    if (!results){
      res.status(404).json({message: "no matching ID found"});
      return;
    } else (res.json(results))
  }).catch((err)=> {
    res.status(500).json(err);
   throw(err)})
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where:{
      id: req.params.id
    }
  }).then(results=> {
    if (!results){res.status(404).json({message:"no matching ID found"});
  return;} else (res.json(results))
  }).catch((err)=> {
    res.status(500).json(err);
   throw(err)})
});

module.exports = router;
