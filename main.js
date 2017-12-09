let digit = 0;
let listRecipes = JSON.parse(localStorage.getItem('localData')) || [
  {
    name: 'Vegan general tao tofu',
    ingredients: ['vegetable broth', 'tofu']
  }, {
    name: 'Peanut energy balls',
    ingredients: ['peanut butter', 'oats', 'cononut flakes']
  }, {
    name: 'Chocolate matzo brittle',
    ingredients: ['matzos', 'chocolate chips', 'toasted nuts', 'dried fruit']
  }
];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      recipes: JSON.parse(localStorage.getItem('localData')) || listRecipes,
      num: digit
    };
  }
  changeNum(m) {
    digit = m;
    this.setState({recipes: listRecipes, num: digit});   
  }
  deleteRecipe(x) {
    listRecipes.splice(x, 1);
    this.setState({recipes: listRecipes});
    localStorage.setItem('localData', JSON.stringify(listRecipes));
  }
  deleteIngredient(x, y) {
    listRecipes[x]
      .ingredients
      .splice(y, 1);
    this.setState({recipes: listRecipes});
    localStorage.setItem('localData', JSON.stringify(listRecipes));
  }
  addIngredient(item, x) {
    if (item === '') {
      alert("New ingredient cannot be empty");
    } else {
      let arrayItem = item.split(',');
      for (let i = 0; i < arrayItem.length; i++) {
        listRecipes[x]
          .ingredients
          .push(arrayItem[i]);
      }
    }
    this.setState({recipes: listRecipes});
    localStorage.setItem('localData', JSON.stringify(listRecipes));
  }
  updateRecipe(inputName, item) {
    if (inputName === '' || item === '') {
      alert("The recipe name and the ingredient cannot be empty");
    } else {
      let recipeName = inputName
        .charAt(0)
        .toUpperCase() + inputName.slice(1);
      let arrayItem = item.split(',');
      listRecipes.push({name: recipeName, ingredients: arrayItem})
    }
    this.setState({recipes: listRecipes});
    localStorage.setItem('localData', JSON.stringify(listRecipes));
    this.refs.addItem.value = '';
    this.refs.addRecipe.value = '';
  }

  render() {
    return (
      <div className="App container">
        <div className="panel panel-default container introduction">
          <h3 className="text-center panel-heading">My Recipe-Box -- Yummy Yummy!</h3>
        </div>
        <div className="container recipe-box">
          {this
            .state
            .recipes
            .map((recipe) => (
              <div className="panel-group">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h2 className="panel-title">
                      <a
                        data-toggle="collapse"
                        href={"#collapse" + this
                        .state
                        .recipes
                        .indexOf(recipe)}>{recipe.name}</a>
                    </h2>
                  </div>
                  <div
                    id={"collapse" + this
                    .state
                    .recipes
                    .indexOf(recipe)}
                    className="panel-collapse collapse">
                    <ul className="list-group">
                      {recipe
                        .ingredients
                        .map((ingredient) => (
                          <li className="list-group-item ingredients">{ingredient}
                            <button
                              onClick={() => this.deleteIngredient(this.state.recipes.indexOf(recipe), recipe.ingredients.indexOf(ingredient))}
                              className="btn btn-default btn-sm pull-right">Delete</button>
                          </li>
                        ))}
                    </ul>
                    <div className="panel-footer">
                      <button
                        onClick={() => this.changeNum(this.state.recipes.indexOf(recipe))}
                        type="button"
                        className="btn btn-success btn-sm "
                        data-toggle="modal"
                        data-target="#myModal2">Add Ingredients</button>
                      <button
                        onClick={() => this.deleteRecipe(this.state.recipes.indexOf(recipe))}
                        className="btn btn-danger btn-sm pull-right deleteRecipe">Delete This Recipe</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          <div>
            <div className="modal fade" id="myModal2" role="dialog">
              <div className="modal-dialog modal-sm">
                <div className="modal-content">
                  <div className="modal-body">
                    <h4>New Ingredients</h4>
                    <input
                      ref="item"
                      type="text"
                      className="form-control"
                      placeholder="Please separate ingredients by comma"/>
                  </div>
                  <div class="modal-footer">
                    <button
                      onClick={() => this.addIngredient(this.refs.item.value, this.state.num)}
                      type="button"
                      className="btn btn-default"
                      data-dismiss="modal">Save</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-success btn-lg addRecipe"
              data-toggle="modal"
              data-target="#myModal">Add Recipes</button>
            <div className="modal fade" id="myModal" role="dialog">
              <div className="modal-dialog modal-sm">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">Yummy Yummy!</h4>
                  </div>
                  <div className="modal-body">
                    <h3>Recipe Name</h3>
                    <input ref="addRecipe" type="text" placeholder="Recipe Name"/>
                    <h4>Ingredients</h4>
                    <input
                      ref="addItem"
                      type="textarea"
                      className="form-control"
                      placeholder="Please separate ingredients by comma"/>
                  </div>
                  <div className="modal-footer">
                    <button
                      onClick={() => this.updateRecipe(this.refs.addRecipe.value, this.refs.addItem.value)}
                      type="button"
                      className="btn btn-default"
                      data-dismiss="modal">Save</button>
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render( < App / > , document.getElementById('container'));
