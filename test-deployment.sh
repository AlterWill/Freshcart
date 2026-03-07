#!/bin/bash

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║        Freshcart Deployment Configuration Validator             ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

echo "✓ Step 1: Checking repository structure..."
[ -f "vercel.json" ] && echo "  [✓] vercel.json exists" || echo "  [✗] vercel.json missing"
[ -d "api" ] && echo "  [✓] api/ directory exists" || echo "  [✗] api/ directory missing"
[ -f "api/index.js" ] && echo "  [✓] api/index.js exists" || echo "  [✗] api/index.js missing"
[ -d "client/dist" ] && echo "  [✓] client/dist/ exists" || echo "  [✗] client/dist/ missing"
[ -f "client/dist/index.html" ] && echo "  [✓] client/dist/index.html exists" || echo "  [✗] client/dist/index.html missing"

echo ""
echo "✓ Step 2: Checking package.json files..."
[ -f "package.json" ] && echo "  [✓] Root package.json exists" || echo "  [✗] Root package.json missing"
[ -f "server/package.json" ] && echo "  [✓] server/package.json exists" || echo "  [✗] server/package.json missing"
[ -f "client/package.json" ] && echo "  [✓] client/package.json exists" || echo "  [✗] client/package.json missing"

echo ""
echo "✓ Step 3: Checking build configuration..."
grep -q "buildCommand" vercel.json && echo "  [✓] buildCommand defined in vercel.json" || echo "  [✗] buildCommand not defined"
grep -q "/api" vercel.json && echo "  [✓] /api route defined" || echo "  [✗] /api route not defined"

echo ""
echo "✓ Step 4: Checking git status..."
[ -z "$(git status --short)" ] && echo "  [✓] Git working tree clean" || echo "  [!] Git changes detected (should be clean)"

echo ""
echo "✓ Step 5: Local build test..."
npm run build > /tmp/build.log 2>&1 && echo "  [✓] Local build succeeds" || echo "  [✗] Local build fails"

echo ""
echo "✓ Step 6: Server startup test..."
cd server && timeout 3 npm start > /tmp/server.log 2>&1 &
SERVER_PID=$!
sleep 2
curl -s http://localhost:5000/api/health > /dev/null 2>&1 && echo "  [✓] Server responds to /api/health" || echo "  [✗] Server not responding"
kill $SERVER_PID 2>/dev/null
cd ..

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "✅ If all checks pass, deployment configuration is correct."
echo "   Vercel DEPLOYMENT_NOT_FOUND error requires dashboard access."
echo "═══════════════════════════════════════════════════════════════"
