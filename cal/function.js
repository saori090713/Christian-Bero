window.calculate = function(a, b, op){
    switch(op){
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b === 0 ? '0' : a / b;
        default: return b;
    }
};
(function(){
            const d = document.getElementById('display');
            let current = '0';
            let operator = null;
            let previous = null;

            function update() { d.value = current; }

            document.querySelectorAll('button[data-num]').forEach(b=>b.addEventListener('click',()=>{
                const v = b.getAttribute('data-num');
                if (v === '.' && current.includes('.')) return;
                if (current === '0' && v !== '.') current = v;
                else current = current + v;
                update();
            }));

            document.querySelectorAll('button[data-op]').forEach(b=>b.addEventListener('click',()=>{
                const op = b.getAttribute('data-op');
                if (op){
                    if (previous !== null && operator){
                        previous = window.calculate(+previous, +current, operator);
                        current = String(previous);
                    } else {
                        previous = current;
                    }
                    operator = op;
                    current = '0';
                    update();
                }
            }));

            document.getElementById('equals').addEventListener('click',()=>{
                if (operator && previous !== null){
                    const result = window.calculate(+previous, +current, operator);
                    current = String(result);
                    operator = null;
                    previous = null;
                    update();
                }
            });

            document.getElementById('clear').addEventListener('click',()=>{ current='0'; operator=null; previous=null; update(); });
        })();