## 数组

### 1 两数之和(嵌套for)

```java
class Solution {
    public int[] twoSum(int[] nums, int n) {
        int[] arr = new int[2];
        for(int i = 0; i<nums.length; i++){
            for(int j = i+1;j<nums.length;j++){
                if(nums[i]+nums[j]==n){
                    arr[0] = i;
                    arr[1] = j;
                }
            }
        } 
        return arr;
    }
}
```

思路：遍历数组，用i,j操纵数组的元素，找到对应的结果 把相应的索引存放到数组中

模板：

```java
     for(int i = 0; i<nums.length; i++){
            for(int j = i+1;j<nums.length;j++){
               
            }
        } 
```

就是遍历数组的时候用for循环，通过ij来确定数组的值进行结果的比对，如果是三层的for循环的话就在用一个变量k 条件就是k = j+1，这样来保证遍历元素的**不重复性**

### 15 三数之和(双指针)

```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> ars = new ArrayList();
        int len = nums.length;
        Arrays.sort(nums);
        if(nums==null || len<3){
            return ars;
        } 

        for(int i = 0;i<len; i++){
            if(nums[i]>0) break;
            if (i>0 && nums[i]==nums[i-1]) continue;
            int L = i+1;
            int R = len-1;
            while(L<R){
                int sum = nums[i]+nums[L]+nums[R];
             if(sum==0){
                ars.add(Arrays.asList(nums[i],nums[L],nums[R]));
                while(L<R&&nums[L]==nums[L+1]) L++;
                while(L<R&&nums[R]==nums[R-1]) R--;
                L++;
                R--;
            }
            else if(sum > 0 ) R--;
            else if(sum < 0 ) L++;
            }
        }
        return ars;
    }
}
```

思路：运用双指针即L,R然后针对不同的情况进行调整，要注意去重，里面要处理三处重复的条件

模板：

```sql
int L = i+1;
int R = len-1;
```

关键就是调整数组中的两个指针的位置

### 11 盛最多水的容器(双指针)

```java
class Solution {
    public int maxArea(int[] height) {
        int len = height.length;
        int max = 0;
        for(int i = 0,j = len-1;i<j;){
            int maxheight = height[i]<height[j]?height[i++]:height[j--];
            int area = (j-i+1) * maxheight;
            max = Math.max(max,area);
        }
        return max;
    }
}
```

思路：双指针即i,j通过不断地增加ij，来维护最大的面积

用到的工具类：Math.max() 需要在外面创建一个变量(max)来进行接收

### 70 爬楼梯(菲波那切，递归？)

```java
class Solution {
    public int climbStairs(int n) {
        if(n<3){
            return n;
        }
        int[] a = new int[n];
        a[0] = 1;
        a[1] = 2;
        for(int i = 2;i<n;i++){
            a[i] = a[i-1]+a[i-2];
        }
        return a[n-1];
    }
}
```

思路：找最近的重复子问题，归纳，并巧妙的运用了数组，从数组中取值

### 283 移动零(双指针)

```java
class Solution {
    public void moveZeroes(int[] nums) {
        int j = 0;
        for(int i = 0;i<nums.length;i++){
            if(nums[i]!=0){
                nums[j] = nums[i];
                if(j!=i){
                    nums[i] = 0;
                }
                j++;
            }
        }
    }
}
```



## 链表

### 206 反转链表(弄出三个指针)

```java
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while(curr!=null){
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}
```

思路：弄出三个指针，next指针是让prev和curr这两个指针往下走的桥梁，然后就遍历每一个就行

### 141 环形链表(快慢指针)

```java
public class StackTest {
    public boolean hasCycle(ListNode head) {
        if(head==null || head.next==null){
            return false;
        }
        ListNode slow = head;
        ListNode fast = head.next;
        while(slow!=fast){
            if(fast==null || fast.next==null){
                return false;
            }
            //我慢走一步
            slow = slow.next;
            //我快走两步
            fast = fast.next.next;
        }
        return true;
    }
}
```

思路：在while循环里面快慢指针不相等的话就一直遍历，通过指针移动的步数不同，如果出现环那么while里面两个指针迟早会见面，那么就跳出循环，返回true





## 树

### 94 二叉树的前中后序遍历

注意：**递归的调用过程是不断往左边走，当左边走不下去了，就打印节点，并转向右边，然后右边继续这个过程。**

```java
class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> list = new ArrayList();
        inorder(root,list);
        return list;
    }

    public void inorder(TreeNode node,List<Integer> list){
        if(node==null) return;
        inorder(node.left,list);
        list.add(node.val);
        inorder(node.right,list);
    }
}
```

模板:

```java
(中)public void inorder(TreeNode node,List<Integer> list){
        if(node==null) return;
        inorder(node.left,list);
        list.add(node.val);
        inorder(node.right,list);
    }
(前)public void inOrder(TreeNode node,List<Integer> res){
        if(node==null) return;
        res.add(node.val);
        inOrder(node.left,res);
        inOrder(node.right,res);
    }
(后)public void inOrder(TreeNode node,List<Integer> res){
        if(node==null) return;
        inOrder(node.left,res);
        inOrder(node.right,res);
        res.add(node.val);
    }
```

### 102  二叉树的层序遍历(BFS)

```java
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList();
        Queue<TreeNode> q = new LinkedList();
        if(root != null) q.offer(root);
        while(!q.isEmpty()){
            int size = q.size();
            List <Integer> level = new ArrayList();
            for(int i = 0;i<size;i++){
                TreeNode cur = q.poll();
                level.add(cur.val);
                if(cur.left!=null) q.offer(cur.left);
                if(cur.right!=null) q.offer(cur.right);
            }
            res.add(level);
        }
        return res;
    }
}
```

思路：就是模板背就行了 很多题都是变式

### 107 二叉树的层序遍历||(BFS)

```java
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList();
        Queue<TreeNode> q = new LinkedList();
        if(root != null) q.offer(root);
        while(!q.isEmpty()){
            int size = q.size();
            List <Integer> level = new ArrayList();
            for(int i = 0;i<size;i++){
                TreeNode cur = q.poll();
                level.add(cur.val);
                if(cur.left!=null) q.offer(cur.left);
                if(cur.right!=null) q.offer(cur.right);
            }
            //这个就是整体插入的时候相反就可以了
            res.add(0,level);
        }
        return res;
    }
}
```

思路：就是把链表的插入顺序换一下就完成了

### 103 二叉树的锯齿形层序遍历(BFS)

```java
class Solution {
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList();
        Queue<TreeNode> q = new LinkedList();
        if(root != null) q.offer(root);
        while(!q.isEmpty()){
            int size = q.size();
            List <Integer> level = new ArrayList();
            for(int i = 0;i<size;i++){
                TreeNode cur = q.poll();
                //这个是结果集的个数，如果结果集的个数是偶数，说明要插入的是奇数层就正常插入，不用反转，相反反之
                if(res.size()%2==0) level.add(cur.val);
                else level.add(0,cur.val);
                if(cur.left!=null) q.offer(cur.left);
                if(cur.right!=null) q.offer(cur.right);
            }
            res.add(level);
        }
        return res;
    }
}
```

### 98 验证二叉搜索树

```java
class Solution {
    public boolean isValidBST(TreeNode root) {
        //采用中序遍历的方法，二叉搜索树的中序遍历是升序的
        Deque<TreeNode> stack = new ArrayDeque();
        List<Integer> res = new ArrayList();
        while(root!=null || !stack.isEmpty()){
            while(root!=null){
                stack.push(root);
                root = root.left;
            }
            root = stack.pop();
            res.add(root.val);
            root = root.right;
        }

        for (int i = 0; i < res.size()-1; i++) {
            if (res.get(i) >= res.get(i + 1)) {
                return false;
            }
        }
        return true;
    }
}
```

思路：利用二叉搜索树的中序遍历是升序的，把结果存放在一个数组里面，在判断这个数组是不是递增的

验证数组是不是递增的模板：注意数组下标不要越界

```java
 for (int i = 0; i < res.size()-1; i++) {
            if (res.get(i) >= res.get(i + 1)) {
                return false;
            }
        }
        return true;
```

**改良版本**：

```java
class Solution {
    public boolean isValidBST(TreeNode root) {
        //采用中序遍历的方法，二叉搜索树的中序遍历是升序的
        Deque<TreeNode> stack = new ArrayDeque();
        double inorder = -Double.MAX_VALUE;
        // List<Integer> res = new ArrayList();
        while(root!=null || !stack.isEmpty()){
            while(root!=null){
                stack.push(root);
                root = root.left;
            }
            root = stack.pop();
            // res.add(root.val);
            if(root.val<=inorder) return false;
            inorder = root.val;
            root = root.right;
        }


        // for (int i = 0; i < res.size()-1; i++) {
        //     if (res.get(i) >= res.get(i + 1)) {
        //         return false;
        //     }
        // }
         return true;
    }
}
```

就是取一个下线，然后在遍历的过程中就可以进行元素的比较，如果小的话那么就更新下线



## 字符串

### 有效的字符异位词(工具类排序)

```java
class Solution {
    public boolean isAnagram(String s, String t) {
        if(s.length()!=t.length()){
            return false;
        }
        char[] c1 = s.toCharArray();
        char[] c2 = t.toCharArray();
        Arrays.sort(c1);
        Arrays.sort(c2);
        return Arrays.equals(c1,c2);
    }
}
```

用到了Arrays的两个工具类，排序，还有判断两个数组是否相等

## 栈

### 20有效的括号(给括号反转并压入栈)

```java
class Solution {
    public boolean isValid(String s) {
        Deque<Character> steak = new ArrayDeque();
        char[] cs = s.toCharArray();
        for(char c: cs ){
            if(c=='(') steak.push(')');
            if(c=='{') steak.push('}');
            if(c=='[') steak.push(']');

            if(c==')'||c==']' ||c=='}'){
                if(steak.isEmpty()||c!=steak.pop()){
                    return false;
                } 
            }
        }
        return steak.isEmpty();
    }
}
```

思路：利用栈的先入后出的特性，注意就是栈里面的元素一致不一致都得删除，不能只有不一致才删除

### 155最小栈

```java
class MinStack {
    Stack<Integer> data;
    Stack<Integer> minData;

    public MinStack() {
        data = new Stack();
        minData = new Stack();
    }
    
    public void push(int val) {
        data.push(val);
        if(minData.isEmpty() || val<=minData.peek()){
            minData.push(val);
        }
    }
        
    
    public void pop() {
        int a = data.peek();
        int b = minData.peek();
        if(a==b){
            // System.out.println(1);
            data.pop();
            minData.pop();
        }else{
            // System.out.println(2);
            data.pop();
        }
    }
    
    public int top() {
        return data.peek();
    }
    
    public int getMin() {
        return minData.peek();
    }
}
```

思路：弄出两个栈，并且维护最小的数字







## 递归

### 22 括号生成(递归，栈)

```java
class Solution {
    List<String> list = new ArrayList();
    public List<String> generateParenthesis(int n) {
        generat(0,0,n,"");
        return list;
    }

    public void generat(int left,int right,int n,String s){
        //终结条件
        if(left==n&&right==n){
            list.add(s);
            return;
        }

        //处理逻辑,并且下探到下一层
        if(left<n){
            generat(left+1,right,n,s+"(");
        }
        if(left>right){
            generat(left,right+1,n,s+")");
        }
    }
}
```

思路：一般这种要求所有情况的就用递归来解决

模板：

1. 递归的结束条件
2. 处理当前层的逻辑
3. 下探到下一层
4. 资源的释放

### 50 Pow(x,n)

```java
class Solution {
    public double myPow(double x, int n) {
        long N = n;
        if(n<0){
            x = 1/x;
            N = -N;
        }
        //调用递归
        return fastPow(x,N);
    }

    //递归反复调用这个方法
    public double fastPow(double x,long n){
        //递归结束条件
        if(n==0){
            return 1.0;
        }
        //重复子问题
        double half = fastPow(x,n/2);
        //当n为奇数的时候
        if(n%2==1){
            return half*half*x;
        }else{
            return half*half;
        }
    }
}
```

思路：递归把重复的问题变换为很多个子问题（分治实际上就是递归），一般递归模板的2,3步会合并到一起，并且一般递归的题不是一个函数能解决的，并且还要**合并子问题**，这个题就是根据奇偶数来进行不同情况的合并



### 78子集(对比左右括号的问题)

 一般如果参数随着递归的成熟增加的话就必须要reverse the current state （清理当前层），保证每一轮的参数都是不变的，不会影响其它层

```java

```





## 哈希表

### 49 字母异位词 mid（(排序，在用hash表分类)）

```java
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
         Map<String,List<String>> map = new HashMap();
        for(String s:strs){
            char[] c = s.toCharArray();
            Arrays.sort(c);
            String done = new String(c);
            if(!map.containsKey(done)){
                map.put(done,new ArrayList());
            }
            map.get(done).add(s);
        }
        return new ArrayList(map.values());
    }
}
```

思路：排完序后就利用hash来进行分类

用到的工具类：把字符串变为char数组的方法

