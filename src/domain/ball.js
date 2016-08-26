/**
 * Created by Dzianis on 26/08/2016.
 */

export default class Ball {
  constructor(color) {
    this.color = color || Ball.getRandomColor();
  }
  
  static getRandomColor() {
    const colors = Object.keys(Ball.COLORS).map(k => Ball.COLORS[k]);
    
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  static COLORS = {
    green: 'green',
    red: 'red',
    blue: 'blue',
    white: 'white',
    black: 'black',
  }
}
