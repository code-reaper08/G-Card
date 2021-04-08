// const num = 4;
// const findMostFrequent = (num = 1) => {
//    const strArr = ["HTML", "Python", "Brainfuck", "Python", "Python", "CSS", "JavaScript", "HTML", "HTML", "HTML", "JavaScript", "HTML", "HTML", "JavaScript", "Python", "HTML", "Python", "JavaScript", "JavaScript", "JavaScript"];
//    const map = {};
//    strArr.forEach(word => {
//       if(map.hasOwnProperty(word)){
//          map[word]++;
//       }else{
//          map[word] = 1;
//       }
//    });
//    const frequencyArr = Object.keys(map).map(key => [key, map[key]]);
//    frequencyArr.sort((a, b) => b[1] - a[1]);
//    return frequencyArr.slice(0, num).map(el => el[0]);
// };
// console.log(findMostFrequent(num));
