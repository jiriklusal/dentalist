#!/bin/bash

# =============================================================================
# DENTALIST - PRODUCTION BUILD SCRIPT
# =============================================================================
# This script prepares the website for production deployment
# It automatically switches DEBUG_MODE from true to false

echo "🚀 DENTALIST - Production Build Script"
echo "======================================"

# Check if config.js exists
if [ ! -f "config.js" ]; then
    echo "❌ Error: config.js file not found!"
    exit 1
fi

echo "📋 Current DEBUG_MODE setting:"
grep "const DEBUG_MODE" config.js

echo ""
echo "🔧 Switching to production mode..."

# Switch DEBUG_MODE from true to false
sed -i.bak 's/const DEBUG_MODE = true;/const DEBUG_MODE = false;/g' config.js

echo "✅ Production mode enabled!"
echo ""
echo "📋 New DEBUG_MODE setting:"
grep "const DEBUG_MODE" config.js

echo ""
echo "🎯 Production checklist:"
echo "• ✅ DEBUG_MODE = false"
echo "• ✅ reCAPTCHA enabled"
echo "• ✅ Test button hidden"
echo "• ✅ Debug messages disabled"

echo ""
echo "🚀 Ready for production deployment!"
echo ""
echo "💡 To revert to development mode, run:"
echo "   sed -i 's/const DEBUG_MODE = false;/const DEBUG_MODE = true;/g' config.js"
