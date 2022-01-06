
import { filter, forkJoin, map, Observable } from "rxjs";

const observableOne = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

const observableTwo = new Observable(subscriber => {
    subscriber.next("one");
    subscriber.next("two");
    setTimeout(() => {
      subscriber.next("three");
      subscriber.complete();
    }, 1000);
    subscriber.next("four");
  });

  observableTwo.subscribe((val)=>{
    console.log("observableTwo", "val:",val);
  });

  observableOne.subscribe((val)=>{
    console.log("observableOne", "val:",val);
  });

  observableTwo
  .pipe(map((x: string) => x.toUpperCase()))
  .subscribe((val)=>{
    console.log("observableTwo with map operator", "val:",val);
  });

  observableOne
  .pipe(filter((val)=>val<6))
  .subscribe((val)=>{
    console.log("observableOne with filter operator", "val:",val);
  });

  const observables = forkJoin({
    observableOne,
    observableTwo
  });

  observables.subscribe({
      next: (data)=>{
        console.log("forkjoin nex data",data);
      },
      complete: ()=>{
        console.log("forkjoin is completed");
      }
  })



