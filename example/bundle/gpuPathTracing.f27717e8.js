function t(t){return t&&t.__esModule?t.default:t}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},a={},i=e.parcelRequire4485;null==i&&((i=function(t){if(t in n)return n[t].exports;if(t in a){var e=a[t];delete a[t];var i={id:t,exports:{}};return n[t]=i,e.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+t+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(t,e){a[t]=e},e.parcelRequire4485=i);var o,r,l=i("ilwiq"),d=i("RPVlj"),c=i("7lx9d"),s=i("5Rd1x"),m=i("7ePFa"),u={};o=u,r=function(){var t=function(){function e(t){return i.appendChild(t.dom),t}function n(t){for(var e=0;e<i.children.length;e++)i.children[e].style.display=e===t?"block":"none";a=t}var a=0,i=document.createElement("div");i.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",i.addEventListener("click",(function(t){t.preventDefault(),n(++a%i.children.length)}),!1);var o=(performance||Date).now(),r=o,l=0,d=e(new t.Panel("FPS","#0ff","#002")),c=e(new t.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var s=e(new t.Panel("MB","#f08","#201"));return n(0),{REVISION:16,dom:i,addPanel:e,showPanel:n,begin:function(){o=(performance||Date).now()},end:function(){l++;var t=(performance||Date).now();if(c.update(t-o,200),t>r+1e3&&(d.update(1e3*l/(t-r),100),r=t,l=0,s)){var e=performance.memory;s.update(e.usedJSHeapSize/1048576,e.jsHeapSizeLimit/1048576)}return t},update:function(){o=this.end()},domElement:i,setMode:n}};return t.Panel=function(t,e,n){var a=1/0,i=0,o=Math.round,r=o(window.devicePixelRatio||1),l=80*r,d=48*r,c=3*r,s=2*r,m=3*r,u=15*r,f=74*r,v=30*r,p=document.createElement("canvas");p.width=l,p.height=d,p.style.cssText="width:80px;height:48px";var h=p.getContext("2d");return h.font="bold "+9*r+"px Helvetica,Arial,sans-serif",h.textBaseline="top",h.fillStyle=n,h.fillRect(0,0,l,d),h.fillStyle=e,h.fillText(t,c,s),h.fillRect(m,u,f,v),h.fillStyle=n,h.globalAlpha=.9,h.fillRect(m,u,f,v),{dom:p,update:function(d,g){a=Math.min(a,d),i=Math.max(i,d),h.fillStyle=n,h.globalAlpha=1,h.fillRect(0,0,l,u),h.fillStyle=e,h.fillText(o(d)+" "+t+" ("+o(a)+"-"+o(i)+")",c,s),h.drawImage(p,m+r,u,f-r,v,m,u,f-r,v),h.fillRect(m+f-r,u,r,v),h.fillStyle=n,h.globalAlpha=.9,h.fillRect(m+f-r,u,r,o((1-d/g)*v))}}},t},"object"==typeof u?u=r():"function"==typeof define&&define.amd?define(r):o.Stats=r();var f=i("jiuw3"),v=i("4CEV9");const p={enableRaytracing:!0,smoothImageScaling:!0,resolutionScale:.5/window.devicePixelRatio,bounces:3,accumulate:!0};let h,g,w,y,x,b,P,S,M,R,C=0;function E(){C=0}function F(){g.aspect=window.innerWidth/window.innerHeight,g.updateProjectionMatrix();const t=window.innerWidth,e=window.innerHeight,n=window.devicePixelRatio*p.resolutionScale;h.setSize(t,e),h.setPixelRatio(n),S.setSize(t*n,e*n),E()}!function(){h=new l.WebGLRenderer({antialias:!1}),h.setPixelRatio(window.devicePixelRatio),h.setClearColor(594970),h.setSize(window.innerWidth,window.innerHeight),h.outputEncoding=l.sRGBEncoding,document.body.appendChild(h.domElement),R=document.getElementById("output"),w=new l.Scene;const e=new l.DirectionalLight(16777215,1);e.position.set(1,1,1),w.add(e),w.add(new l.AmbientLight(11583173,.5)),g=new l.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,50),g.position.set(-2,2,3),g.far=100,g.updateProjectionMatrix(),x=new(t(u)),document.body.appendChild(x.dom);const n=new l.ShaderMaterial({defines:{BOUNCES:5},uniforms:{bvh:{value:new v.MeshBVHUniformStruct},normalAttribute:{value:new v.FloatVertexAttributeTexture},cameraWorldMatrix:{value:new l.Matrix4},invProjectionMatrix:{value:new l.Matrix4},seed:{value:0},opacity:{value:1}},vertexShader:"\n\n\t\t\tvarying vec2 vUv;\n\t\t\tvoid main() {\n\n\t\t\t\tvec4 mvPosition = vec4( position, 1.0 );\n\t\t\t\tmvPosition = modelViewMatrix * mvPosition;\n\t\t\t\tgl_Position = projectionMatrix * mvPosition;\n\n\t\t\t\tvUv = uv;\n\n\t\t\t}\n\n\t\t",fragmentShader:`\n\t\t\t#define RAY_OFFSET 1e-5\n\n\t\t\tprecision highp isampler2D;\n\t\t\tprecision highp usampler2D;\n\t\t\t${v.shaderStructs}\n\t\t\t${v.shaderIntersectFunction}\n\t\t\t#include <common>\n\n\t\t\tuniform mat4 cameraWorldMatrix;\n\t\t\tuniform mat4 invProjectionMatrix;\n\t\t\tuniform sampler2D normalAttribute;\n\t\t\tuniform BVH bvh;\n\t\t\tuniform float seed;\n\t\t\tuniform float opacity;\n\t\t\tvarying vec2 vUv;\n\n\t\t\tvoid main() {\n\n\t\t\t\t// get [-1, 1] normalized device coordinates\n\t\t\t\tvec2 ndc = 2.0 * vUv - vec2( 1.0 );\n\t\t\t\tvec3 rayOrigin, rayDirection;\n\t\t\t\tndcToCameraRay( ndc, cameraWorldMatrix, invProjectionMatrix, rayOrigin, rayDirection );\n\n\t\t\t\t// Lambertian render\n\t\t\t\tgl_FragColor = vec4( 0.0 );\n\n\t\t\t\tvec3 throughputColor = vec3( 1.0 );\n\t\t\t\tvec3 randomPoint = vec3( .0 );\n\n\t\t\t\t// hit results\n\t\t\t\tuvec4 faceIndices = uvec4( 0u );\n\t\t\t\tvec3 faceNormal = vec3( 0.0, 0.0, 1.0 );\n\t\t\t\tvec3 barycoord = vec3( 0.0 );\n\t\t\t\tfloat side = 1.0;\n\t\t\t\tfloat dist = 0.0;\n\n\t\t\t\tfor ( int i = 0; i < BOUNCES; i ++ ) {\n\n\t\t\t\t\tif ( ! bvhIntersectFirstHit( bvh, rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist ) ) {\n\n\t\t\t\t\t\tfloat value = ( rayDirection.y + 0.5 ) / 1.5;\n\t\t\t\t\t\tvec3 skyColor = mix( vec3( 1.0 ), vec3( 0.75, 0.85, 1.0 ), value );\n\n\t\t\t\t\t\tgl_FragColor = vec4( skyColor * throughputColor * 2.0, 1.0 );\n\n\t\t\t\t\t\tbreak;\n\n\t\t\t\t\t}\n\n\t\t\t\t\t// 1 / PI attenuation for physically correct lambert model\n\t\t\t\t\t// https://www.rorydriscoll.com/2009/01/25/energy-conservation-in-games/\n\t\t\t\t\tthroughputColor *= 1.0 / PI;\n\n\t\t\t\t\trandomPoint = vec3(\n\t\t\t\t\t\trand( vUv + float( i + 1 ) + vec2( seed, seed ) ),\n\t\t\t\t\t\trand( - vUv * seed + float( i ) - seed ),\n\t\t\t\t\t\trand( - vUv * float( i + 1 ) - vec2( seed, - seed ) )\n\t\t\t\t\t);\n\t\t\t\t\trandomPoint -= 0.5;\n\t\t\t\t\trandomPoint *= 2.0;\n\n\t\t\t\t\t// ensure the random vector is not 0,0,0 and that it won't exactly negate\n\t\t\t\t\t// the surface normal\n\n\t\t\t\t\tfloat pointLength = max( length( randomPoint ), 1e-4 );\n\t\t\t\t\trandomPoint /= pointLength;\n\t\t\t\t\trandomPoint *= 0.999;\n\n\t\t\t\t\t// fetch the interpolated smooth normal\n\t\t\t\t\tvec3 normal =\n\t\t\t\t\t\tside *\n\t\t\t\t\t\ttextureSampleBarycoord(\n\t\t\t\t\t\t\tnormalAttribute,\n\t\t\t\t\t\t\tbarycoord,\n\t\t\t\t\t\t\tfaceIndices.xyz\n\t\t\t\t\t\t).xyz;\n\n\t\t\t\t\t// adjust the hit point by the surface normal by a factor of some offset and the\n\t\t\t\t\t// maximum component-wise value of the current point to accommodate floating point\n\t\t\t\t\t// error as values increase.\n\t\t\t\t\tvec3 point = rayOrigin + rayDirection * dist;\n\t\t\t\t\tvec3 absPoint = abs( point );\n\t\t\t\t\tfloat maxPoint = max( absPoint.x, max( absPoint.y, absPoint.z ) );\n\t\t\t\t\trayOrigin = point + faceNormal * ( maxPoint + 1.0 ) * RAY_OFFSET;\n\t\t\t\t\trayDirection = normalize( normal + randomPoint );\n\n\t\t\t\t}\n\n\t\t\t\tgl_FragColor.a = opacity;\n\n\t\t\t}\n\n\t\t`});b=new d.FullScreenQuad(n),n.transparent=!0,n.depthWrite=!1,(new c.GLTFLoader).load("../models/DragonAttenuation.glb",(t=>{let e;t.scene.traverse((t=>{t.isMesh&&"Dragon"===t.name&&(e=t,t.geometry.scale(.25,.25,.25).rotateX(Math.PI/2))}));const a=new l.PlaneBufferGeometry(5,5,1,1);a.rotateX(-Math.PI/2);const i=m.mergeBufferGeometries([a,e.geometry],!1);i.translate(0,-.5,0),M=new l.Mesh(i,new l.MeshStandardMaterial),w.add(M);const o=new v.MeshBVH(M.geometry,{maxLeafTris:1,strategy:v.SAH});n.uniforms.bvh.value.updateFrom(o),n.uniforms.normalAttribute.value.updateFrom(M.geometry.attributes.normal)})),S=new l.WebGLRenderTarget(1,1,{format:l.RGBAFormat,type:l.FloatType}),P=new d.FullScreenQuad(new l.MeshBasicMaterial({map:S.texture}));new s.OrbitControls(g,h.domElement).addEventListener("change",(()=>{E()})),y=new f.GUI,y.add(p,"enableRaytracing").name("enable"),y.add(p,"accumulate"),y.add(p,"smoothImageScaling"),y.add(p,"resolutionScale",.1,1,.01).onChange(F),y.add(p,"bounces",1,10,1).onChange((t=>{n.defines.BOUNCES=parseInt(t),n.needsUpdate=!0,E()})),y.open(),window.addEventListener("resize",F,!1),F()}(),function t(){if(x.update(),requestAnimationFrame(t),h.domElement.style.imageRendering=p.smoothImageScaling?"auto":"pixelated",M&&p.enableRaytracing){if(p.accumulate)if(0===C)g.clearViewOffset();else{const t=S.width,e=S.height;g.setViewOffset(t,e,Math.random()-.5,Math.random()-.5,t,e)}else E();g.updateMatrixWorld();const t=(b.material.uniforms.seed.value+.11111)%2;b.material.uniforms.seed.value=t,b.material.uniforms.cameraWorldMatrix.value.copy(g.matrixWorld),b.material.uniforms.invProjectionMatrix.value.copy(g.projectionMatrixInverse),b.material.uniforms.opacity.value=1/(C+1),h.autoClear=0===C,h.setRenderTarget(S),b.render(h),h.setRenderTarget(null),P.render(h),h.autoClear=!0,C++}else E(),g.clearViewOffset(),h.render(w,g);R.innerText=`samples: ${C}`}();
//# sourceMappingURL=gpuPathTracing.f27717e8.js.map
