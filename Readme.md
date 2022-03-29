#Rightrc

Identity right holder and saver for hobby AI projects.


## init

```javascript

const right = new (require('rightrc')).base();

```

## Set power 
note : higher is less
```javascript

right.setPower($power_integer$);

//return boolean
```

## Get power 
```javascript

right.getPower();

//return integer

```

## Check power 
```javascript

right.checkPower($power_integer$);

//return boolean

```

## Add id or hash 
```javascript

right.add($id_hash$);

//return boolean

```

## Del id or hash 
```javascript

right.del($id_hash$);

//return boolean

```

## list id or hash 

```javascript

right.list();

//return list array of hashes

```

## Check Id
```javascript

right.checkId($id_hash$);

//return boolean

```
## Check Any
```javascript

right.checkId($id_hash_or_integer_or_array_of_elements$);

//return boolean

```
