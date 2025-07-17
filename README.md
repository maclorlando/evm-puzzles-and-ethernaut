# 🧩 EVM Puzzles & Ethernaut Challenges

This repository contains solutions & detailed explanations for a set of **Ethereum Virtual Machine (EVM)** bytecode puzzles and **Ethernaut smart contract hacking challenges**.

These exercises demonstrate advanced understanding of:
- EVM opcodes & bytecode-level analysis
- Ethereum storage layout & visibility
- Common smart contract vulnerabilities and their exploitation

---

## 📋 Overview

✅ Ethernaut Challenges — smart contract hacking puzzles  
✅ EVM Puzzles — raw opcode-level problems requiring manual analysis  
✅ Detailed explanations & code for each solution

---


# 🏴‍☠️ Ethernaut Challenges  

## 🔐 Level 8 — Vault  
- **Goal:** Unlock a locked contract by retrieving a private password stored in storage.

### ✅ Solution:  
→ Read storage slot `1` directly using `getStorageAt()`. Solidity's `private` only hides data at the contract level, not from the blockchain.

✔️ Unlocked.

---

## 🕵️ Level 12 — Privacy  
- **Goal:** Unlock the contract by providing the correct key.

### ✅ Solution:  
→ Read from storage slot `5`. The key is the first 16 bytes (`bytes16`) of the `bytes32` value at slot `5`.

✔️ Unlocked.

---

## 🚪 Level 13 — GatekeeperOne  
- **Goal:** Pass 3 gates with specific conditions.

### 🔥 Constraints:  
1. `msg.sender != tx.origin` → Must be called via a contract.  
2. `gasleft() % 8191 == 0` → Find the correct gas offset.  
3. Key constraint based on wallet address bit manipulations.

→ ⚠️ Note: Gas constraints are highly unstable in Hardhat local environments. Passed reliably only on testnets.

✔️ Passed with brute-force + computed key.

---

## 🧠 Level 18 — MagicNumber  
- **Goal:** Deploy a contract that always returns `42`.

### ✅ Solution:  
→ Deploy pure EVM bytecode `602a60005260206000f3` that returns `42`.

✔️ Solver deployed and set.

---

## 👽 Level — AlienCodex  
- **Goal:** Become the owner by exploiting array underflow.

### ✅ Solution:  
→ Use `retract()` to cause array length underflow, expanding the dynamic array to cover all storage slots. Overwrite the `owner` at slot `0`.

✔️ Ownership claimed.

---

# ⚙️ EVM Puzzles  

## 🪙 Puzzle 1 — Jump by msg.value  
→ Jump to `msg.value`. Must match the `JUMPDEST` at byte 7.  
✔️ Solution: msg.value = 7  

---

## 🧠 Puzzle 2 — Jump by (CODESIZE - msg.value)  
→ Jump to `CODESIZE - msg.value = 6`.  
✔️ Solution: msg.value = 4  

---

## 📜 Puzzle 3 — Jump by CALLDATASIZE  
→ Jump to CALLDATASIZE.  
✔️ Solution: Send 4 bytes calldata (e.g., 0xdeadbeef)  

---

## ⚙️ Puzzle 4 — (CALLVALUE & CODESIZE) == 9  
→ Solve `x & 11 = 9`.  
✔️ Solution: msg.value = 9  

---

## ➗ Puzzle 5 — Quadratic Check  
→ Must satisfy: `msg.value * msg.value == 256`.  
✔️ Solution: msg.value = 16  

---

## 🗃️ Puzzle 6 — Jump via CALLDATALOAD(0)  
→ Must jump to byte 10.  
✔️ Solution: calldata = `0x...0a` (32 bytes ending in `0a`)  

---

## 🏗️ Puzzle 7 — EXTCODESIZE == 1  
→ Deploy a contract with exactly 1 byte of runtime code (`STOP`).  
✔️ Solution: calldata = `0x00`  

---

## 💣 Puzzle 8 — CALL Must Fail  
→ Deploy a contract that always fails (e.g., with `REVERT`).  
✔️ Solution: calldata = `0xfd`  

---

## 🔢 Puzzle 9 — (CALLDATASIZE * CALLVALUE) == 8  
→ Also requires CALLDATASIZE ≥ 3.  
✔️ Solution: msg.value = 2, calldata = 4 bytes (e.g., 0xdeadbeef)  

---

## 🎯 Puzzle 10 
→ Multiple constraints:  
1. `CODESIZE > CALLVALUE`  
2. `CALLDATASIZE % 3 == 0`  
3. `(0x0A + CALLVALUE) == 18` (i.e., msg.value = 8)  

✔️ Solution: msg.value = 8, calldata length = multiple of 3  

---

# 🔥 More EVM Puzzles  

## 🚀 More Puzzle 1 — Jump by CALLVALUE  
→ Jump to byte `CALLVALUE` to hit the `JUMPDEST` at byte 10.  
✔️ Solution: msg.value = 10  

---

## ⚙️ More Puzzle 2 — Minimal Proxy + Return Check  
→ Deploy a contract and then CALL it. Check CALL returns 1.  
✔️ Solution: Deploy simple contract that returns `1`.  

---

## 🔁 More Puzzle 3 — Minimal Proxy + Return == 42  
→ Same as Puzzle 2 but checks return value == 42.  
✔️ Solution: Deploy a contract that returns `42`.  

---

## 📜 More Puzzle 4 — Complex Proxy Check  
→ Combines SHA3 of calldata + runtime checks.  
✔️ Solution: Deploy contract that returns SHA3 of input with correct padding.  

---

## ➕ More Puzzle 5 — (CALLDATASIZE + CALLVALUE) == 8  
→ Example: CALLDATASIZE = 4, CALLVALUE = 4.  
✔️ Solution: msg.value = 4, calldata = 4 bytes  

---

## 🔗 More Puzzle 6 — High Bit Constraint  
→ `(msg.value & 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF) >> 248 == 1`  
✔️ Solution: msg.value = 256 (0x100)  

---

## 🔥 More Puzzle 7 — msg.value Check + Gas Constraint  
→ Requires msg.value = 1 and a precise gas offset (fragile).  
✔️ Solution: msg.value = 1 (gas constraint is non-deterministic in Hardhat)  

---

## 🏗️ More Puzzle 8 — Deploy, CALL Must Return 1, Balance Check  
→ Deploy contract that returns 1 when called. After CALL, balance must be zero.  
✔️ Solution: Deploy a contract that returns 1.  

---

## 🧠 More Puzzle 9 — Hash Byte Match  
→ `(keccak256(padded msg.value) >> 248) == 0xA8`  
✔️ Solution: msg.value = 47  

---

## 💣 More Puzzle 10 — Bitwise AND + OR  
→ (value1 & 0xF0F0...F0) | (value2) == 0xABAB...AB  
✔️ Solution:  
- value1 = `0xA0A0...A0` (provides high bits)  
- value2 = `0x0B0B...0B` (provides low bits)  

---

# 💡 Summary of Key Learnings  
- Mastered EVM bytecode structure (runtime vs deployment).  
- Deeply understood stack-based execution with strict operand order.  
- Gained fluency in key opcodes: `JUMP`, `JUMPI`, `CALLDATALOAD`, `CALLVALUE`, `EXTCODESIZE`, `CREATE`, `CALL`.  
- Practiced vulnerabilities like storage exposure, underflows, calldata manipulation, SHA3-based storage, and gas constraint edge cases.  
- Understood why gas-based constraints are brittle in local dev environments (e.g., GatekeeperOne, Puzzle 7).  

---

## 📚 References  
- https://www.evm.codes/  
- https://ethernaut.openzeppelin.com/  
- https://github.com/fvictorio/evm-puzzles  
- https://github.com/daltyboy11/more-evm-puzzles
