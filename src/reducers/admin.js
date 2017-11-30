const admin = (state = [], action) => {
  switch (action.type) {
    case "REMOVE_USER":
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case "BLOCK_USER":
      return state.map(todo => (todo.id === action.id ? { ...todo, completed: !todo.completed } : todo));
    default:
      return state;
  }
};

export default admin;
