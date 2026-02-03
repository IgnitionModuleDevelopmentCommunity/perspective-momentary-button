import java.util.concurrent.TimeUnit


plugins {
    base
    // the ignition module plugin: https://github.com/inductiveautomation/ignition-module-tools
    id("io.ia.sdk.modl") version("0.1.1")
    id("org.barfuin.gradle.taskinfo") version "1.3.0"
}

allprojects {
    version = "2.0.0"
    group = "org.imdc"
}

ignitionModule {
    fileName.set("PerspectiveMomentaryButton")
    name.set("Perspective Momentary Button")
    id.set("org.imdc.perspective.momentarybutton")
    moduleVersion.set("${project.version}")
    moduleDescription.set("The module provides a Perspective momentary button component")
    requiredIgnitionVersion.set("8.3.0")
    license.set("license.html")

    moduleDependencies.put("com.inductiveautomation.perspective", "DG")

    projectScopes.putAll(
        mapOf(
            ":gateway" to "G",
            ":web" to "G",
            ":designer" to "D",
            ":common" to "GD"
        )
    )

    hooks.putAll(
        mapOf(
            "org.imdc.perspective.momentarybutton.gateway.GatewayHook" to "G",
            "org.imdc.perspective.momentarybutton.designer.DesignerHook" to "D"
        )
    )
}


val deepClean by tasks.registering {
    dependsOn(allprojects.map { "${it.path}:clean" })
    description = "Executes clean tasks and remove node plugin caches."
    doLast {
        delete(file(".gradle"))
    }
}